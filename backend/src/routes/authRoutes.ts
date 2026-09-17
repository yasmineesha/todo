import { Router } from 'express';
import {getTodos, createTodo, updateTodo, deleteTodo} from '../controllers/todoController';
import { validateTodo, validateUpdateTodo} from '../middlewares/validator';

const router = Router();

router.get('/', getTodos);

router.post('/', validateTodo, createTodo);

router.put('/:id', deleteTodo);

export default router;
