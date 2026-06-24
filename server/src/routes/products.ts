import express from 'express';
import { body, param } from 'express-validator';
import { getAllProducts, getProductById, getProductsByCategory, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { authenticateToken } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/category/:category', getProductsByCategory);

router.post('/', authenticateToken, [
  body('name').trim().notEmpty().withMessage('O nome do produto é obrigatório'),
  body('price').isFloat({ min: 0.01 }).withMessage('O preço deve ser um valor positivo'),
  body('category').trim().notEmpty().withMessage('A categoria é obrigatória'),
  validateRequest,
], createProduct);

router.put('/:id', authenticateToken, [
  body('name').optional().trim().notEmpty().withMessage('O nome não pode ser vazio'),
  body('price').optional().isFloat({ min: 0.01 }).withMessage('O preço deve ser um valor positivo'),
  validateRequest,
], updateProduct);

router.delete('/:id', authenticateToken, deleteProduct);

export default router;