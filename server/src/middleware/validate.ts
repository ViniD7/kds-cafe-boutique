import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

/**
 * Middleware genérico de validação que lê os erros gerados pelo express-validator.
 * Deve ser usado como último middleware na cadeia de validação das rotas.
 *
 * Exemplo de uso:
 *   router.post('/register', [
 *     body('email').isEmail(),
 *     body('password').isLength({ min: 6 }),
 *     validateRequest
 *   ], register);
 */
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Dados inválidos',
      errors: errors.array().map(err => ({
        field: 'path' in err ? err.path : undefined,
        message: err.msg,
      })),
    });
  }

  next();
  return;
};
