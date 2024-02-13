import { Router } from 'express';
import { addItemToCart } from '../controller/cartController';
import { validateLoginRequest } from '../validator/loginValidator';
import { authorizePermission } from '../middlewares/authMiddleware';
import { validateItemToCart } from '../validator/cartValidator';

const router = Router();

router.post(
  '/',
  validateLoginRequest,
  authorizePermission('add_cart'),
  validateItemToCart,
  addItemToCart
);

export default router;
