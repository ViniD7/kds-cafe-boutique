import express from 'express';
import { body } from 'express-validator';
import { getUserOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/orderController';
import { authenticateToken } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';

const router = express.Router();

router.get('/', authenticateToken, getUserOrders);
router.get('/:id', authenticateToken, getOrderById);

router.post('/', authenticateToken, [
  body('total').isFloat({ min: 0 }).withMessage('O total deve ser um valor numérico válido'),
  validateRequest,
], createOrder);

router.put('/:id', authenticateToken, [
  body('status').trim().notEmpty().withMessage('O status é obrigatório'),
  validateRequest,
], updateOrder);

router.delete('/:id', authenticateToken, deleteOrder);

export default router;