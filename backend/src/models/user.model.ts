import { model, Model, Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String }
},
    { timestamps: true }
)

const User = model('User', userSchema)
export default User