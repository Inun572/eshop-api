import { Router } from 'express';
import { getAllUsers } from '../controller/authController';

const router = Router();

router.get('/', getAllUsers);

export default router;
