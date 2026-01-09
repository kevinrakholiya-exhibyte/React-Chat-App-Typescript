import React from 'react'
import { useTheme } from '../contextAPI/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, LogOut, MessageCircle, Moon, SettingsIcon, Sun } from 'lucide-react'

const Settings = () => {
    const { theme, setLightTheme, setDarkTheme } = useTheme()
    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="bg-blue-600 dark:bg-gray-800 text-white p-4 sm:p-6 shadow-md">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate("/chats")}
                        className="mb-4 flex items-center gap-2 text-blue-100 dark:text-gray-300 hover:text-white transition">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-sm font-medium">Back to Chat</span>
                    </button>

                    <div className="flex items-center gap-3">
                        <SettingsIcon className="w-8 h-8" />
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold">
                                Settings
                            </h1>
                            <p className="text-blue-100 dark:text-gray-300 text-sm">
                                Manage your preferences
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto p-4 sm:p-6">
                {/* Theme Section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 mb-4">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            {theme === "dark" ? (
                                <Moon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            ) : (
                                <Sun className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            )}
                        </div>

                        <div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                Appearance
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Choose your preferred theme
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Light Mode */}
                        <div
                            onClick={setLightTheme}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                theme === "light"
                                    ? "border-blue-500 bg-blue-50 dark:bg-gray-700"
                                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                            }`}>
                            <div className="flex items-center gap-3">
                                <Sun className="w-6 h-6 text-yellow-500" />
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        Light Mode
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Bright and clear
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Dark Mode */}
                        <div
                            onClick={setDarkTheme}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                theme === "dark"
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                            }`}>
                            <div className="flex items-center gap-3">
                                <Moon className="w-6 h-6 text-indigo-500" />
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        Dark Mode
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Easy on the eyes
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                        onClick={() => navigate("/chats")}
                        className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-md">
                        <MessageCircle className="w-5 h-5" />
                        Go to Chat
                    </button>

                    <button
                        className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-md">
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
  )
}

export default Settings