import express from 'express'
import { createUser, deleteUser, getUserById, getUsers, updateUser, updateUserStatus } from '../controllers/User.js'
import { staffOnly, verifyUser } from '../controllers/Middleware.js'

const router = express.Router()

router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.post('/users', createUser)
router.patch('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)
router.patch('/users/:id', updateUserStatus)

export default router