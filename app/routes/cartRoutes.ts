import { Router } from 'express';
import {
  addItemToCart,
  getAllCarts,
  getCartByUserId,
  removeItemFromCart,
  updateQuantityItemInCart,
} from '../controller/cartController';
import { validateLoginRequest } from '../validator/loginValidator';
import {
  authorizePermission,
  validateToken,
} from '../middlewares/authMiddleware';
import { validateItemToCart } from '../validator/cartValidator';
import { validateParams } from '../validator/paramsValidator';

const router = Router();

router.get('/', validateToken, authorizePermission('browse_cart'), getAllCarts);

router.get(
  '/:id',
  validateToken,
  authorizePermission('read_cart'),
  validateParams('id'),
  getCartByUserId
);

router.post(
  '/',
  validateToken,
  authorizePermission('add_cart'),
  validateItemToCart,
  addItemToCart
);

router.put(
  '/',
  validateToken,
  authorizePermission('update_cart'),
  validateItemToCart,
  updateQuantityItemInCart
);

router.delete(
  '/:id',
  validateToken,
  authorizePermission('delete_cart'),
  validateParams('id'),
  removeItemFromCart
);

export default router;
