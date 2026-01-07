import React, { useState, type ChangeEvent } from 'react'
import { useChat } from '../contextAPI/ChatContext'
import ConversationUser from './ConversationUser'
import { SearchIcon } from 'lucide-react'

const Conversation = () => {
    const { users, message, activeChat, setActiveChat } = useChat()
    const [search, setSearch] = useState<string>("")

    const filteredUsers = [...users]
        .filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => Number(b.isPinned) - Number(a.isPinned))

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    return (
        <div className="p-1">
            <div className="px-4 pb-3">
                <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-lg px-3">
                    <input
                        type="text"
                        placeholder="Search chats"
                        value={search}
                        onChange={handleSearch}
                        className="w-full bg-transparent text-sm py-2 text-gray-700 dark:text-gray-200 focus:outline-none"
                    />
                    <SearchIcon className="text-white" />
                </div>
            </div>

            {filteredUsers.map((user) => {
                // get last message of this user
                const lastMessage = message
                    .filter((m) => m.chatId === user.id)
                    .slice(-1)[0]

                return (
                    <ConversationUser
                        key={user.id}
                        name={user.name}
                        userId={user.id}
                        avatar={user.avatar}
                        message={lastMessage?.text ?? "No messages yet"}
                        time={lastMessage?.time?.toString() ?? ""}
                        active={activeChat === user.id}
                        onClick={() => setActiveChat(user.id)}
                        isPinned={user.isPinned}
                    />
                )
            })}
        </div>
    )
}

export default Conversation