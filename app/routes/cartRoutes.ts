import { Router } from 'express';
import {
  addItemToCart,
  getAllCarts,
  getCartByUserId,
} from '../controller/cartController';
import { validateLoginRequest } from '../validator/loginValidator';
import {
  authorizePermission,
  validateToken,
} from '../middlewares/authMiddleware';
import { validateItemToCart } from '../validator/cartValidator';
import { validateParams } from '../validator/paramsValidator';

const router = Router();

router.get(
  '/',
  validateLoginRequest,
  validateToken,
  authorizePermission('browse_cart'),
  getAllCarts
);

router.get(
  '/:id',
  validateLoginRequest,
  validateToken,
  authorizePermission('read_cart'),
  validateParams('id'),
  getCartByUserId
);

router.post(
  '/',
  validateLoginRequest,
  authorizePermission('add_cart'),
  validateItemToCart,
  addItemToCart
);

export default router;
