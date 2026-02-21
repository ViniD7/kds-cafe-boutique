import express from 'express';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../controllers/cartController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, getCart);
router.post('/add', authenticateToken, addToCart);
router.put('/update/:itemId', authenticateToken, updateCartItem);
router.delete('/remove/:itemId', authenticateToken, removeFromCart);
router.delete('/clear', authenticateToken, clearCart);

export default router;