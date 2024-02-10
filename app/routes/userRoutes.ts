import { Router } from 'express';
import {
  authorizePermission,
  validateToken,
} from '../middlewares/authMiddleware';
import {
  deleteUser,
  getAllUsers,
  registerUser,
  updateUser,
} from '../controller/userController';
import { validateRegisterRequest } from '../validator/registerValidator';

const router = Router();

router.get(
  '/',
  validateToken,
  authorizePermission('browse_users'),
  getAllUsers
);

router.post('/register', validateRegisterRequest, registerUser);
router.put('/:id', validateToken, authorizePermission('edit_user'), updateUser);
router.delete(
  '/:id',
  validateToken,
  authorizePermission('delete_user'),
  deleteUser
);

export default router;
