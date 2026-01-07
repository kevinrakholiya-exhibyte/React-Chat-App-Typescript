import React, { useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { useChat } from '../contextAPI/ChatContext'

const MessageInput = () => {
    const [text, setText] = useState<string>("")
    const { addMessage, setIsTyping, activeChat } = useChat()
    const isChatActive = Boolean(activeChat)

    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const isDisabled = !isChatActive || !text.trim()

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

    const sendMessage = () => {
        if (isDisabled) return

        addMessage(text)
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
                        : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600" }`}>
                Send
            </button>
        </div>
    )
}

export default MessageInput