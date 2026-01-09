import React, { useEffect, useRef } from 'react'
import { useChat } from '../contextAPI/ChatContext'
import type { Message, User } from '../type/chat'
import { Check, Pencil, Trash2 } from 'lucide-react'
import { useAppDispatch, useAppselector } from '../redux/store/hooks'
import { deleteMessage, editMessage, setMessages } from '../redux/slices/chatSlice'
import { deleteMessageFromDB, getMessagesFromDB, updateMessageInDB } from '../DB/indexedDB'

interface MessagesProps {
    searchText: string
}

const Messages = ({ searchText }: MessagesProps) => {
    const bottomRef = useRef<HTMLDivElement | null>(null)
    // const tabUserId = sessionStorage.getItem("tabUserId")
    const currentUserId = useAppselector(state => state.chat.currentUserId)
    const dispatch = useAppDispatch()
    const activeChat = useAppselector(state => state.chat.activeChat)
    const message = useAppselector(state => state.chat.messages)
    const users = useAppselector(state => state.chat.users)
    const isTyping = useAppselector(state => state.chat.isTyping)

    // Auto scroll to bottom on new message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [message, activeChat])
    const formatTime = (timestamp: number | Date): string => {
        const date = timestamp instanceof Date ? timestamp : new Date(timestamp)
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    useEffect(() => {
        const loadMessages = async () => {
            const storedMessages = await getMessagesFromDB()
            dispatch(setMessages(storedMessages))
        }
        loadMessages()
    }, [dispatch])

    const activeUser: User | undefined = users.find(
        (user: User) => Number(user.id) === Number(activeChat)
    )

    const handleEdit = async (msg: Message) => {
        const newText = prompt("Edit Message:", msg.text)
        if (newText && newText !== msg.text) {
            dispatch(editMessage({ id: msg.id, text: newText }))
            await updateMessageInDB(msg.id, newText)
        }
    }

    const handleDelete = async (id: number) => {
        if (window.confirm("Are You Sure Want to Delete Message")) {
            dispatch(deleteMessage(id))
            await deleteMessageFromDB(id)
        }
    }

    const filteredMessages: Message[] = message.filter((msg: Message) => {
        if (msg.chatId !== activeChat) return false
        if (!searchText.trim()) return true
        return msg.text.toLowerCase().includes(searchText.toLowerCase())
    })

    return (
        <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            {/* HEADER */}
            <div className="w-full h-16 bg-purple-600 dark:bg-gray-800 flex items-center px-4 shadow-md">
                <img
                    src={
                        activeUser?.avatar ||
                        "https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
                    }
                    alt={activeUser?.name || "User"}
                    className="w-11 h-11 rounded-full border-2 border-white" />

                <div className="ml-3 flex-1">
                    <p className="text-white font-semibold leading-tight">
                        {activeUser?.name || "Select a chat"}
                    </p>
                    <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span className="text-xs text-white/80">
                            {activeUser ? "Online" : ""}
                        </span>
                    </div>
                </div>

                {activeChat && isTyping && (
                    <div className="text-xs text-green-300 italic animate-pulse">
                        Typing...
                    </div>
                )}
            </div>

            {/* MESSAGE LIST */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {filteredMessages.map((msg) => {
                    const isSender = msg.sender === currentUserId

                    return (
                        <div
                            key={msg.id}
                            className={`flex group ${isSender ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`relative max-w-xs px-4 py-2 rounded-2xl text-sm shadow ${isSender
                                    ? "bg-purple-600 text-white rounded-br-none"
                                    : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none"
                                    }`}>
                                {msg.text}

                                <div className="flex items-center justify-end gap-1 text-[10px] opacity-70 mt-1">
                                    <span>{formatTime(msg.time)}</span>
                                    {isSender && msg.status === "sent" && (
                                        <Check size={12} className="translate-y-[1px]" />
                                    )}
                                </div>

                                {isSender && (
                                    <div className="absolute -top-2 -right-2 hidden group-hover:flex gap-1 bg-white dark:bg-gray-800 shadow rounded-full p-1">
                                        <button
                                            onClick={() => handleEdit(msg)}
                                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                                            <Pencil size={12} />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(msg.id)}
                                            className="p-1 hover:bg-red-100 text-red-500 rounded">
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}

                <div ref={bottomRef} />
            </div>
        </div>
    )
}

export default Messages