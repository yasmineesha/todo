import { Router } from 'express';
import { register, login } from '../controllers/authController';
import todoRoutes from './todoRoutes';
import { validateRegister, validateLogin } from '../middlewares/validator';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/auth/register', validateRegister, register);
router.post('/auth/login', validateLogin, login);
router.use('/todos', verifyToken, todoRoutes);

export default router;
