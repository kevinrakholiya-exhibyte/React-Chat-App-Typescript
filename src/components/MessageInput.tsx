import React, { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { useChat } from '../contextAPI/ChatContext'
import { useAppDispatch, useAppselector } from '../redux/store/hooks'
import { addMessage, setActiveChat, setCurrentUserId } from '../redux/slices/chatSlice'
import { addMessageToDB, getMessagesFromDB } from '../DB/indexedDB'
import type { Message } from '../type/chat'

const MessageInput = () => {

    const dispatch = useAppDispatch()
    const activeChat = useAppselector(state => state.chat.activeChat)
    const currentUserId = useAppselector(state => state.chat.currentUserId)

    const [text, setText] = useState<string>("")
    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const { setIsTyping } = useChat()
    const isChatActive = Boolean(activeChat)
    const isDisabled = !isChatActive || !text.trim()

    useEffect(() => {
        let id = sessionStorage.getItem("tabUserId")
        if (!id) {
            id = "user_" + Math.random().toString(36).slice(2)
            sessionStorage.setItem("tabUserId", id)
        }
        dispatch(setCurrentUserId(id))
    }, [dispatch])

    useEffect(() => {
        const savedChat = sessionStorage.getItem("activeChatId")
        if (savedChat) {
            dispatch(setActiveChat(Number(savedChat)))
        }
    }, [dispatch])


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!isChatActive) return

        const value = e.target.value
        setText(value)
        setIsTyping(true)

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false)
        }, 900)
    }

    const sendMessage = async () => {
        if (isDisabled || !activeChat || !currentUserId) return

        const newMessage: Message = {
            id: Date.now(),
            chatId: activeChat,
            sender: currentUserId,
            text,
            time: new Date(),
            status: "sent",
        }
        dispatch(addMessage(newMessage))
        await addMessageToDB(newMessage)
        setText("")

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && isChatActive) {
            sendMessage()
        }
    }
    return (
        <div className="flex gap-2 p-2 bg-gray-100 dark:bg-gray-900">
            <input
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={
                    isChatActive
                        ? "Type a message..."
                        : "Select a chat to start messaging"}
                className={`flex-1 p-2 rounded-lg outline-none
                    ${isChatActive
                        ? "bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"}`} />

            <button
                onClick={sendMessage}
                disabled={isDisabled}
                className={`px-4 rounded-lg transition text-white
          ${isDisabled
                        ? "bg-gray-400 cursor-not-allowed dark:bg-gray-600"
                        : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600"}`}>
                Send
            </button>
        </div>
    )
}

export default MessageInput