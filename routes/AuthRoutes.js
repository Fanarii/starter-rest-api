import express from 'express'
import { Logout, Me, StaffLogin, UserLogin } from '../controllers/Auth.js';


const router = express.Router()

router.get('/me', Me)
router.post('/user-login', UserLogin)
router.post('/staff-login', StaffLogin)
router.delete('/logout', Logout)

export default router;