import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Message, User } from "../../type/chat";

interface ChatState {
    users: User[]
    messages: Message[]
    activeChat: string | null
    isTyping: boolean
    currentUserId: string | null
}

const initialState: ChatState = {
    users: [],
    messages: [],
    activeChat: null,
    isTyping: false,
    currentUserId: null
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {

        addUser(state, action: PayloadAction<User>) {
            state.users.push(action.payload)
        },
        setUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload
        },
        updateUser(state, action: PayloadAction<{ id: string; data: Partial<User> }>) {
            const user = state.users.find(u => u._id === action.payload.id)
            if (user) Object.assign(user, action.payload.data)
        },
        deleteUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter(u => u._id !== action.payload)
            if (state.activeChat === action.payload) {
                state.activeChat = null
            }
        },
        addMessage(state, action: PayloadAction<Message>) {
            state.messages.push(action.payload)
        },
        setMessages(state, action: PayloadAction<Message[]>) {
            state.messages = action.payload
        },
        editMessage(state, action: PayloadAction<{ id: number, text: string }>) {
            const msg = state.messages.find(m => m.id === action.payload.id)
            if (msg) msg.text = action.payload.text
        },
        deleteMessage(state, action: PayloadAction<number>) {
            state.messages = state.messages.filter(m => m.id !== action.payload)
        },
        setActiveChat(state, action: PayloadAction<string>) {
            state.activeChat = action.payload
            sessionStorage.setItem("activeChatId", String(action.payload))
        },
        togglePinChat(state, action: PayloadAction<string>) {
            const user = state.users.find(u => u._id === action.payload)
            if (user) {
                user.isPinned = !user.isPinned
            }
        },
        setCurrentUserId(state, action: PayloadAction<string>) {
            state.currentUserId = action.payload
        }
    }
})

export const { setUsers, addUser, updateUser, deleteUser, addMessage, setActiveChat, togglePinChat, setCurrentUserId, setMessages, editMessage, deleteMessage } = chatSlice.actions

export default chatSlice.reducer