import { Router } from 'express';
import {
  authorizePermission,
  validateToken,
} from '../middlewares/authMiddleware';
import {
  deactiveUser,
  getAllUsers,
  getUserById,
  hardDeleteUser,
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

router.put(
  '/deactive/:id',
  validateToken,
  authorizePermission('delete_user'),
  validateParams('id'),
  deactiveUser
);

router.delete(
  '/destroy/:id',
  validateToken,
  authorizePermission('delete_user'),
  validateParams('id'),
  hardDeleteUser
);

export default router;
