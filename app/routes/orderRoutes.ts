import { Router } from 'express';
import {
  authorizePermission,
  validateToken,
} from '../middlewares/authMiddleware';
import { Permission } from '../../database/authentication';
import {
  cancelOrder,
  createOrder,
  getAllOrderSeller,
  getAllOrderUser,
  getAllOrders,
  paymentOrder,
  updateStatusOrder,
} from '../controller/orderController';
import { validateParams } from '../validator/paramsValidator';
import { validatePaymentRequest } from '../validator/orderValidator';

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

router.post(
  '/payment',
  validateToken,
  authorizePermission(Permission.EDIT_OWN_ORDER),
  validatePaymentRequest,
  paymentOrder
);

router.put(
  '/updateStatus/:id',
  validateToken,
  authorizePermission(Permission.EDIT_OWN_ORDER),
  validateParams,
  updateStatusOrder
);

router.delete(
  '/cancel/:id',
  validateToken,
  authorizePermission(Permission.DELETE_OWN_ORDER),
  validateParams('id'),
  cancelOrder
);

export default router;
