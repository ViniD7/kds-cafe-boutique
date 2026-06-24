import express from 'express';
import { body } from 'express-validator';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../controllers/cartController';
import { authenticateToken } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';

const router = express.Router();

router.get('/', authenticateToken, getCart);

router.post('/add', authenticateToken, [
  body('productId').trim().notEmpty().withMessage('O ID do produto é obrigatório'),
  body('quantity').isInt({ min: 1 }).withMessage('A quantidade deve ser pelo menos 1'),
  validateRequest,
], addToCart);

router.put('/update/:itemId', authenticateToken, [
  body('quantity').isInt({ min: 0 }).withMessage('A quantidade deve ser um número inteiro válido'),
  validateRequest,
], updateCartItem);

router.delete('/remove/:itemId', authenticateToken, removeFromCart);
router.delete('/clear', authenticateToken, clearCart);

export default router;