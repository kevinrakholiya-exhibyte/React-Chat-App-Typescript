export interface Message {
    id: number
    chatId: number
    sender: string
    text: string
    time: Date
    status?: "sent" | "received"
    edited?:boolean
}

export interface User {
    id: number
    name: string
    email: string
    avatar?: string
    isPinned?:boolean
}