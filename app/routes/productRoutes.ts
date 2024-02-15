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
import { validateProductInput } from '../validator/productValidator';
import {
  hardDeleteProduct,
  softDeleteProduct,
} from '../services/productServices';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', validateParams('id'), getProductById);
router.post(
  '/',
  validateToken,
  authorizePermission('add_own_product'),
  validateProductInput,
  createProduct
);

router.put(
  '/:id',
  validateToken,
  authorizePermission('edit_product'),
  validateParams('id'),
  validateProductInput,
  editProductById
);

router.put(
  '/delete/:id',
  validateToken,
  authorizePermission('delete_product'),
  validateParams('id'),
  softDeleteProduct
);
router.put(
  '/destroy/:id',
  validateToken,
  authorizePermission('delete_product'),
  validateParams('id'),
  hardDeleteProduct
);

export default router;
