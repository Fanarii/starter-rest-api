import express from 'express'
import { createOrder, deleteOrder, getOrderById, getOrders, updateOrder } from '../controllers/Order.js'
import { staffOnly, verifyUser } from '../controllers/Middleware.js';

const router = express.Router();

router.get('/orders', getOrders);
router.get('/orders/:id', getOrderById);
router.post('/orders', createOrder);
router.patch('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

export default router;