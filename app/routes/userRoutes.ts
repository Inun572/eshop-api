import { Router } from 'express';
import {
  authorizePermission,
  validateToken,
} from '../middlewares/authMiddleware';
import { getAllUsers, registerUser } from '../controller/userController';
import { validateRegisterRequest } from '../validator/registerValidator';

const router = Router();

router.get(
  '/',
  validateToken,
  authorizePermission('browse_users'),
  getAllUsers
);

router.post('/register', validateRegisterRequest, registerUser);

export default router;
