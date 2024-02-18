import { Router } from 'express';
import {
  addItemToCart,
  getAllCarts,
  getCartByUserId,
  removeItemFromCart,
  updateQuantityItemInCart,
} from '../controller/cartController';
import {
  authorizePermission,
  validateToken,
} from '../middlewares/authMiddleware';
import { validateItemToCart } from '../validator/cartValidator';
import { validateParams } from '../validator/paramsValidator';
import { Permission } from '../../database/authentication';

const router = Router();

router.get(
  '/admin',
  validateToken,
  authorizePermission(Permission.BROWSE_CARTS),
  getAllCarts
);

router.get(
  '/admin/:id',
  validateToken,
  authorizePermission(Permission.READ_CART),
  validateParams('id'),
  getCartByUserId
);

router.get(
  '/',
  validateToken,
  authorizePermission(Permission.READ_OWN_CART),
  getCartByUserId
);

router.post(
  '/admin',
  validateToken,
  authorizePermission(Permission.ADD_CART),
  validateItemToCart,
  addItemToCart
);

router.post(
  '/',
  validateToken,
  authorizePermission(Permission.ADD_OWN_CART),
  validateItemToCart,
  addItemToCart
);

router.put(
  '/admin',
  validateToken,
  authorizePermission(Permission.EDIT_CART),
  validateItemToCart,
  updateQuantityItemInCart
);
router.put(
  '/',
  validateToken,
  authorizePermission(Permission.EDIT_OWN_CART),
  validateItemToCart,
  updateQuantityItemInCart
);

router.delete(
  '/admin/:id',
  validateToken,
  authorizePermission(Permission.DELETE_CART),
  validateParams('id'),
  removeItemFromCart
);
router.delete(
  '/:id',
  validateToken,
  authorizePermission(Permission.DELETE_OWN_CART),
  validateParams('id'),
  removeItemFromCart
);

export default router;
