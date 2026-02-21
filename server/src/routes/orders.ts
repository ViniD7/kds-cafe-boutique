import express from 'express';
import { getUserOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/orderController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, getUserOrders);
router.get('/:id', authenticateToken, getOrderById);
router.post('/', authenticateToken, createOrder);
router.put('/:id', authenticateToken, updateOrder);
router.delete('/:id', authenticateToken, deleteOrder);

export default router;