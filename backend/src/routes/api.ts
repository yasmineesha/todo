import { Router} from 'express';
import { register, login } from '../controllers/authController';
import { getTodos, createTodo } from '../controllers/todoController';
import { validateRegister, validateLogin, validateTodo } from '../middlewares/validator';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/auth/register', validateRegister, register);
router.post('/auth/login', validateLogin, login);

router.get('/todos', verifyToken, getTodos);
router.post('/todos', verifyToken, validateTodo, createTodo);

export default router;
