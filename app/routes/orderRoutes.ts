import { Router } from 'express';
import {
  authorizePermission,
  validateToken,
} from '../middlewares/authMiddleware';
import { Permission } from '../../database/authentication';
import {
  createOrder,
  getAllOrderSeller,
  getAllOrderUser,
  getAllOrders,
} from '../controller/orderController';

const router = Router();

router.get(
  '/admin',
  validateToken,
  authorizePermission(Permission.BROWSE_ORDERS),
  getAllOrders
);

router.get(
  '/seller',
  validateToken,
  authorizePermission(Permission.READ_OWN_ORDER),
  getAllOrderSeller
);

router.get(
  '/',
  validateToken,
  authorizePermission(Permission.READ_OWN_ORDER),
  getAllOrderUser
);

router.post(
  '/create',
  validateToken,
  authorizePermission(Permission.ADD_OWN_ORDER),
  createOrder
);

export default router;
