import React, { useState, type ChangeEvent, type FormEvent } from 'react'
import type { User } from '../type/chat'
import { useChat } from '../contextAPI/ChatContext'
import { X } from 'lucide-react'
import { useAppDispatch } from '../redux/store/hooks'
import { updateUser } from '../redux/slices/chatSlice'
import { updateUserProfile } from '../DB/indexedDB'

interface EditUserModelProps {
    user: User
    onClose: () => void
}

interface EditUserForm {
    name: string
    avatar: string
}
const EditUserModel = ({ user, onClose }: EditUserModelProps) => {

    const dispatch = useAppDispatch()


    const [form, setForm] = useState<EditUserForm>({
        name: user.name,
        avatar: user.avatar ?? ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const updatedData = {
            name: form.name.trim(),
            avatar: form.avatar.trim()
        }
        dispatch(updateUser({
            id: user.id,
            data: updatedData
        }))
        await updateUserProfile(user.id, updatedData)
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 w-96 rounded-xl p-5 shadow-lg">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold dark:text-white">
                        Edit Profile
                    </h3>
                    <X
                        className="cursor-pointer text-gray-500 hover:text-red-500"
                        onClick={onClose} />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm dark:text-gray-300">
                            Name
                        </label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:text-white" />
                    </div>

                    <div>
                        <label className="text-sm dark:text-gray-300">
                            Avatar URL
                        </label>
                        <input
                            name="avatar"
                            value={form.avatar}
                            onChange={handleChange}
                            className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:text-white" />
                    </div>

                    {/* Avatar Preview */}
                    <div className="flex justify-center mt-2">
                        <div className="w-40 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
                                <img
                                    src={
                                        form.avatar ||
                                        'https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg'
                                    }
                                    alt="avatar preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h4 className="mt-2 text-center text-sm font-medium dark:text-white">
                                {form.name || 'No name'}
                            </h4>
                            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                                Avatar Preview
                            </p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUserModel