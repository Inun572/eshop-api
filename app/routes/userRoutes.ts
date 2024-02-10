import { Router } from 'express';
import {
  authorizePermission,
  validateToken,
} from '../middlewares/authMiddleware';
import { getAllUsers } from '../controller/userController';

const router = Router();

router.get(
  '/',
  validateToken,
  authorizePermission('browse_users'),
  getAllUsers
);

export default router;
