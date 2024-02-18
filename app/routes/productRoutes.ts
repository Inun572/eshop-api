import { Router } from 'express';
import {
  createProduct,
  editProductById,
  getAllProducts,
  getProductById,
} from '../controller/productController';
import { validateParams } from '../validator/paramsValidator';
import {
  authorizePermission,
  validateToken,
} from '../middlewares/authMiddleware';
import {
  validateEditProductInput,
  validateProductInput,
} from '../validator/productValidator';
import {
  hardDeleteProduct,
  softDeleteProduct,
} from '../services/productServices';
import { Permission } from '../../database/authentication';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', validateParams('id'), getProductById);
router.post(
  '/admin',
  validateToken,
  authorizePermission(Permission.ADD_ALL_PRODUCT),
  validateProductInput,
  createProduct
);

router.post(
  '/',
  validateToken,
  authorizePermission(Permission.ADD_OWN_PRODUCT),
  validateProductInput,
  createProduct
);

router.put(
  '/admin:id',
  validateToken,
  authorizePermission(Permission.EDIT_ALL_PRODUCT),
  validateParams('id'),
  validateEditProductInput,
  editProductById
);
router.put(
  '/:id',
  validateToken,
  authorizePermission(Permission.EDIT_OWN_PRODUCT),
  validateParams('id'),
  validateEditProductInput,
  editProductById
);

router.delete(
  '/admin/delete/:id',
  validateToken,
  authorizePermission(Permission.DELETE_ALL_PRODUCT),
  validateParams('id'),
  softDeleteProduct
);
router.delete(
  '/delete/:id',
  validateToken,
  authorizePermission(Permission.DELETE_OWN_PRODUCT),
  validateParams('id'),
  softDeleteProduct
);
router.delete(
  '/admin/destroy/:id',
  validateToken,
  authorizePermission(Permission.DELETE_ALL_PRODUCT),
  validateParams('id'),
  hardDeleteProduct
);

export default router;
