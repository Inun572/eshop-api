import { Router } from 'express';
import { getAllUsers } from '../controller/authController';

const router = Router();

router.post('/login');

export default router;
