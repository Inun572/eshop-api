import { Router } from 'express';
import {
  authorizePermission,
  validateToken,
} from '../middlewares/authMiddleware';
import {
  deleteUser,
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
} from '../controller/userController';
import { validateRegisterRequest } from '../validator/registerValidator';
import { validateParams } from '../validator/paramsValidator';

const router = Router();

router.get(
  '/',
  validateToken,
  authorizePermission('browse_users'),
  getAllUsers
);

router.get(
  '/:id',
  validateToken,
  authorizePermission('read_user'),
  validateParams('id'),
  getUserById
);

router.post('/register', validateRegisterRequest, registerUser);

router.put(
  '/:id',
  validateToken,
  authorizePermission('edit_user'),
  validateParams('id'),
  updateUser
);

router.delete(
  '/:id',
  validateToken,
  authorizePermission('delete_user'),
  validateParams('id'),
  deleteUser
);

export default router;
