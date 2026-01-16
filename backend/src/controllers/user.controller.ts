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
        res.status(200).json(user)
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
        const { _id, name, avatar } = req.body
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { name, avatar }
        )
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ message: "User update failed" })
    }
}

// DELETE user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { _id } = req.body
        if (!_id) {
            return res.status(400).json({ message: "User ID is required" })
        }
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({
            message: "User deleted successfully",
            userId: _id
        })
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user" })
    }
}