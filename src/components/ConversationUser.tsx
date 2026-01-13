import { Pencil, Pin, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import EditUserModel from './EditUserModel'
import { useAppDispatch } from '../redux/store/hooks'
import { deleteUser, togglePinChat } from '../redux/slices/chatSlice'
import axios from 'axios'

interface ConversationUserProps {
    name: string
    userId: string
    avatar?: string
    email: string
    message: string
    time: number | string
    active: boolean
    onClick: () => void
    isPinned?: boolean
}

const ConversationUser = ({ name, userId, avatar, email, message, time, active, onClick, isPinned }: ConversationUserProps) => {
    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const formatTime = (timestamp?: number): string => {
        if (!timestamp) return ""

        const date = new Date(timestamp)
        const now = new Date()
        const isToday = date.toDateString() === now.toDateString()
        if (isToday) {
            return date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })
        }

        return date.toLocaleDateString()
    }
    const handleDeleteUser = async (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!window.confirm("Are you sure you want to delete this user?")) return
        try {
            dispatch(deleteUser(userId))
            await axios.post("http://localhost:5000/api/users/delete",
                { _id: userId }
            )
        } catch (error) {
            console.error("Delete failed", error)
            alert("Failed to delete user")
        }
    }
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-3 p-3 mx-2 my-1 rounded-xl cursor-pointer transition-all duration-200 ease-in-out
        ${active
                    ? "bg-gray-200 dark:bg-gray-600"
                    : "bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"}`}>
            {/* Avatar */}
            <img
                src={
                    avatar ||
                    "https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
                }
                alt={name}
                className="w-10 h-10 rounded-full object-cover" />

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                        {name}
                    </h4>

                    <div className="text-xs text-gray-400 dark:text-gray-300">
                        {time ? formatTime(typeof time === 'string' ? parseInt(time) : time) : ""}
                    </div>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400 w-40 truncate">
                    {message}
                </div>
            </div>

            <div className="flex items-center gap-2">
                {/* Pin */}
                <button
                    title={isPinned ? "Unpin chat" : "Pin chat"}
                    onClick={(e) => {
                        e.stopPropagation()
                        dispatch(togglePinChat(userId))
                    }}
                    className={`p-2 rounded-full transition-all duration-300 ease-in-out
            ${isPinned
                            ? "bg-yellow-100 text-yellow-600 scale-110"
                            : "text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"}`}>
                    <Pin
                        size={14}
                        className={`transition-transform duration-300 ease-in-out cursor-pointer ${isPinned ? "rotate-45" : "rotate-0"}`} />
                </button>

                {/* Edit */}
                <button
                    title="Edit user"
                    onClick={(e) => {
                        e.stopPropagation()
                        setOpenEdit(true)
                    }}
                    className="p-2 rounded-full text-gray-400 hover:text-indigo-500 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                    <Pencil size={16} />
                </button>
                <button
                    title="Delete user"
                    onClick={handleDeleteUser}
                    className="p-2 rounded-full text-gray-400 hover:text-indigo-500 cursor-pointer dark:hover:bg-gray-600">
                    <Trash2 size={17}/>
                </button>

            </div>

            {openEdit && (
                <EditUserModel
                    user={{ _id: userId, name, email, avatar }}
                    onClose={() => setOpenEdit(false)}
                />
            )}
        </div>
    )
}
export default ConversationUser