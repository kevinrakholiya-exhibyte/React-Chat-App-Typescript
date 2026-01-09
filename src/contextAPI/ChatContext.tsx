import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import type { Message, User } from "../type/chat"
import { addMessageToDB, addUsersToDB, deleteMessageFromDB, getMessagesFromDB, getMessagesLastId, getUsersFromDB, updateMessageInDB, updateUserProfile } from "../DB/indexedDB"

interface ChatContextType {
    users: User[]
    message: Message[]
    activeChat: number | null
    isTyping: boolean

    setUsers: React.Dispatch<React.SetStateAction<User[]>>
    setActiveChat: React.Dispatch<React.SetStateAction<number | null>>
    setIsTyping: React.Dispatch<React.SetStateAction<boolean>>

    addMessage: (text: string) => Promise<void>
    addUser: (user: User) => Promise<void>
    updateUser: (id: number, data: Partial<User>) => Promise<void>

    editMessage: (id: number, newText: string) => Promise<void>
    deleteMessage: (id: number) => Promise<void>

    togglePinChat: (userId: number) => Promise<void>
}

const ChatContext = createContext<ChatContextType | null>(null)

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([])
    const [message, setMessage] = useState<Message[]>([])
    const [activeChat, setActiveChat] = useState<number | null>(null)
    const [isTyping, setIsTyping] = useState<boolean>(false)

    const lastMessagesId = useRef<number>(0)

    const loadMessages = async (): Promise<void> => {
        try {
            const data = await getMessagesFromDB()
            const messages: Message[] = data.map((msg: Message) => ({
                ...msg,
                status: msg.status || "sent",
            }));
            setMessage(messages);
            if (messages.length > 0) {
                lastMessagesId.current = messages[messages.length - 1].id
            }
        } catch (error) {
            console.error("Failed to load messages:", error)
            setMessage([])
        }
    }

    useEffect(() => {
        const POLL_INTERVAL = 400

        const pollMessages = async () => {
            if (!activeChat) return

            const newMessages = await getMessagesLastId(
                lastMessagesId.current
            )

            if (newMessages.length > 0) {
                lastMessagesId.current =
                    newMessages[newMessages.length - 1].id

                setMessage((prev) => [...prev, ...newMessages])
            }
        }

        const interval = setInterval(pollMessages, POLL_INTERVAL)
        return () => clearInterval(interval)
    }, [activeChat])

    const getTabUserId = (): string => {
        let id = sessionStorage.getItem("tabUserId")
        if (!id) {
            id = "user_" + Math.random().toString(36).slice(2)
            sessionStorage.setItem("tabUserId", id)
        }
        return id
    }

    const tabUserId = getTabUserId()

    const loadUsers = async (): Promise<void> => {
        try {
            const data = await getUsersFromDB()
            setUsers(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error("Failed to load users:", error)
            setUsers([])
        }
    }
    if (activeChat !== null) {
        localStorage.setItem("activeChat", String(activeChat));
    }
    const savedChat = localStorage.getItem("activeChat");
    if (savedChat && activeChat === null) {
        setActiveChat(Number(savedChat));
    }
    useEffect(() => {
        loadMessages()
        loadUsers()
    }, [])
    const addMessage = async (text: string): Promise<void> => {
        if (!activeChat) return

        const newMessage: Omit<Message, "id"> = {
            chatId: activeChat,
            text,
            sender: tabUserId,
            time: new Date(),
            status: "sent",
        }

        const savedMessage = await addMessageToDB(newMessage)
        if (!savedMessage) return

        setMessage((prev) => [...prev, savedMessage])
        lastMessagesId.current = savedMessage.id
    };

    const editMessage = async (id: number, newText: string): Promise<void> => {
        try {
            setMessage((prev) =>
                prev.map((msg) =>
                    msg.id === id ? { ...msg, text: newText, edited: true } : msg
                )
            );
            const success = await updateMessageInDB(id, newText);
            if (!success) throw new Error("Edit failed");
        } catch (error) {
            console.error("Failed to edit message:", error);
        }
    }

    const deleteMessage = async (id: number): Promise<void> => {
        try {
            await deleteMessageFromDB(id)
            setMessage((prev) => prev.filter((msg) => msg.id !== id))
        } catch (error) {
            console.error("Failed to delete message:", error)
        }
    }

    const addUser = async (user: User): Promise<void> => {
        try {
            const newUser: User = { ...user, isPinned: false }

            await addUsersToDB(newUser)

            setUsers((prev) => [...prev, newUser])
            setActiveChat(newUser.id)
        } catch (error) {
            console.error("Failed to add user:", error)
        }
    }


    const updateUser = async (
        id: number,
        data: Partial<User>
    ): Promise<void> => {
        await updateUserProfile(id, data)
        setUsers((prev) =>
            prev.map((user) =>
                user.id === id ? { ...user, ...data } : user
            )
        )
    }

    const togglePinChat = async (userId: number): Promise<void> => {
        try {
            const user = users.find((u) => u.id === userId)
            if (!user) return

            const updatedPin = !user.isPinned
            await updateUserProfile(userId, { isPinned: updatedPin })

            setUsers((prev) =>
                prev.map((u) =>
                    u.id === userId ? { ...u, isPinned: updatedPin } : u
                )
            )
        } catch (error) {
            console.error("Failed to pin chat:", error)
        }
    }

    return (
        <ChatContext.Provider value={{ users, setUsers, message, activeChat, setActiveChat, addMessage, addUser, isTyping, setIsTyping, updateUser, editMessage, deleteMessage,togglePinChat }}>
            {children}
        </ChatContext.Provider>
    )
}
const useChat = () => {
    const context = useContext(ChatContext)
    if (!context) {
        throw new Error("useChat must be used within ChatProvider")
    }
    return context
}

export { useChat }