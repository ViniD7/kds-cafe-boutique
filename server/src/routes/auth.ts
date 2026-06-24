import express from 'express';
import { body } from 'express-validator';
import { register, login, logout, getProfile, updateProfile } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';

const router = express.Router();

router.post('/register', [
  body('name').trim().notEmpty().withMessage('O nome é obrigatório'),
  body('email').isEmail().withMessage('Formato de e-mail inválido').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
  validateRequest,
], register);

router.post('/login', [
  body('email').isEmail().withMessage('Formato de e-mail inválido').normalizeEmail(),
  body('password').notEmpty().withMessage('A senha é obrigatória'),
  validateRequest,
], login);

router.post('/logout', logout);
router.get('/profile', authenticateToken, getProfile);

router.put('/profile', authenticateToken, [
  body('name').optional().trim().notEmpty().withMessage('O nome não pode ser vazio'),
  body('email').optional().isEmail().withMessage('Formato de e-mail inválido').normalizeEmail(),
  validateRequest,
], updateProfile);

export default router;