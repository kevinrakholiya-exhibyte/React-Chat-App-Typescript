import { Router } from "express";
import { createUser, deleteUser, getAllUsers, updateUser } from "../controllers/user.controller";

const router = Router()

router.post('/register', createUser)
router.get('/', getAllUsers)
router.put('/update', updateUser)
router.delete('/delete', deleteUser)

export default router