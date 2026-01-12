import { Request, Response } from "express"
import User from "../models/user.model"

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
