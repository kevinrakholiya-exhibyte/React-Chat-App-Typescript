import { Router } from "express";
import { createUser, deleteUser, getAllUsers, updateUser } from "../controllers/user.controller";

const router = Router()

router.post('/register', createUser)
router.get('/', getAllUsers)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

export default router