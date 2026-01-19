export interface Message {
    id: number
    chatId: string
    sender: string
    text: string
    time: Date
    status?: "sent" | "received"
    edited?: boolean
}

export interface User {
    _id: string
    name: string
    email: string
    avatar?: string
    isPinned?: boolean
}

export interface GetUsersData {
    users: {
        _id: string
        name: string
        email: string
        avatar?: string
        createdAt?: string
    }[]
}