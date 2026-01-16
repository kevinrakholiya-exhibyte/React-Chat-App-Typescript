import { Request, Response } from "express"
import User from "../models/user.model"

// register user 
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, avatar } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            user = await User.create({ name, email, avatar })
        }
        res.status(200).json({ user, message: "User created successfully" })
    } catch (error) {
        res.status(400).json({ message: "User creation failed" })
    }
}

// fetch all user from Database
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().sort({ createdAt: 1 })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users" })
    }
}

// update user details
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, avatar } = req.body
        const user = await User.findByIdAndUpdate(
            id,
            { name, avatar },
            { new: true }
        )
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({ user, message: "User updated successfully" })
    } catch (error) {
        res.status(500).json({ message: "User update failed" })
    }
}

// DELETE user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({ message: "User deleted successfully", id })
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user" })
    }
}