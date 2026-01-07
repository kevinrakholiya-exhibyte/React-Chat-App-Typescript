import { Image, Mail, UserPlus, UserPlus2 } from 'lucide-react'
import React, { useState, type ChangeEvent, type FormEvent } from 'react'
import { useChat } from '../contextAPI/ChatContext'
import { useNavigate } from 'react-router-dom'

interface ChatUser {
    id: number
    name: string
    email: string
    avatar?: string
    online: boolean
}

interface AddUserForm {
    id: number
    name: string
    email: string
    avatar: string
}
const AddUser = () => {
    const { addUser } = useChat()
    const navigate = useNavigate()

    const [form, setForm] = useState<AddUserForm>({
        id: Date.now(),
        name: "",
        email: "",
        avatar: "",
    })

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev: AddUserForm) => ({ ...prev, [name]: value }))
    }

    const validateForm = (): string | null => {
        if (!form.name.trim()) {
            return "Name is required"
        }
        if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
            return "Please enter a valid email"
        }
        return null
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const validationError = validateForm()
        if (validationError) {
            setError(validationError)
            return
        }

        const newUser: ChatUser = {
            id: form.id,
            name: form.name,
            email: form.email,
            avatar:
                form.avatar ||
                "https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg",
            online: true,
        }
        try {
            setError(null)
            setLoading(true)
            await addUser(newUser)
            navigate("/chats")
        } catch (err) {
            console.error("Failed to add user:", err)
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-6">
                {/* Header */}
                <div className="text-center">
                    <UserPlus2 className="w-10 h-10 mx-auto text-indigo-500" />
                    <h2 className="text-xl font-semibold mt-2 dark:text-white">
                        Add New User
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Invite someone to chat
                    </p>
                </div>

                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-2 space-y-4">
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="text-sm font-medium dark:text-gray-200 block">
                                Name
                            </label>
                            <div className="flex items-center gap-3 mt-2">
                                <UserPlus className="w-5 h-5 text-gray-400" />
                                <input
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Full name"
                                    required
                                    className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="text-sm font-medium dark:text-gray-200 block">
                                Email
                            </label>
                            <div className="flex items-center gap-3 mt-2">
                                <Mail className="w-5 h-5 text-gray-400" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="user@email.com"
                                    className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>
                        </div>

                        {/* Avatar */}
                        <div>
                            <label
                                htmlFor="avatar"
                                className="text-sm font-medium dark:text-gray-200 block">
                                Avatar URL (optional)
                            </label>
                            <div className="flex items-center gap-3 mt-2">
                                <Image className="w-5 h-5 text-gray-400" />
                                <input
                                    id="avatar"
                                    name="avatar"
                                    value={form.avatar}
                                    onChange={handleChange}
                                    placeholder="https://image..."
                                    className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Avatar Preview */}
                    <div className="md:col-span-1 flex items-start md:items-center justify-center">
                        <div className="w-40 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                            <div className="w-28 h-28 rounded-full overflow-hidden mx-auto">
                                <img
                                    src={
                                        form.avatar ||
                                        "https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg"
                                    }
                                    alt="avatar preview"
                                    className="w-full h-full object-cover"/>
                            </div>
                            <h4 className="mt-3 text-center text-sm font-medium dark:text-white">
                                {form.name || "No name"}
                            </h4>
                            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                                Avatar Preview
                            </p>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="text-sm text-red-600 dark:text-red-400 text-center">
                        {error}
                    </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`flex-1 flex items-center justify-center gap-2 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 disabled:opacity-60 ${loading ? "cursor-wait" : ""}`}>
                        {loading ? "Adding..." : "Add User"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/chats")}
                        className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white border-gray-200 hover:bg-gray-500">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddUser