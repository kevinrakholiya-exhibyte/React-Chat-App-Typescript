import React, { useEffect, useState, type ChangeEvent } from 'react'
import ConversationUser from './ConversationUser'
import { SearchIcon } from 'lucide-react'
import { useAppDispatch, useAppselector } from '../redux/store/hooks'
import { setActiveChat, setUsers } from '../redux/slices/chatSlice'
import { getUsersFromDB } from '../DB/indexedDB'
import { useQuery } from '@apollo/client/react'
import { GET_USERS } from '../graphql/queries'
import type { GetUsersData } from '../type/chat'

const Conversation = () => {

    const dispatch = useAppDispatch()
    const users = useAppselector(state => state.chat.users)
    const messages = useAppselector(state => state.chat.messages)
    const activeChat = useAppselector(state => state.chat.activeChat)
    const [search, setSearch] = useState<string>("")

    const { data, loading, error } = useQuery<GetUsersData>(GET_USERS)
    useEffect(() => {
        if (data?.users) {
            dispatch(
                setUsers(
                    data.users.map((u: any) => ({
                        _id: u._id,
                        name: u.name,
                        email: u.email,
                        avatar: u.avatar,
                        online: true,
                        isPinned: false,
                    }))
                )
            )
        }
    }, [data, dispatch])



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
                const lastMessage = messages
                    .filter((m) => String(m.chatId) === user._id)
                    .slice(-1)[0]

                return (
                    <ConversationUser
                        key={user._id}
                        name={user.name}
                        email={user.email}
                        userId={user._id}
                        avatar={user.avatar}
                        message={lastMessage?.text ?? "No messages yet"}
                        time={lastMessage?.time?.toString() ?? ""}
                        active={activeChat === user._id}
                        onClick={() => dispatch(setActiveChat(user._id))}
                        isPinned={user.isPinned}
                    />
                )
            })}
        </div>
    )
}

export default Conversation