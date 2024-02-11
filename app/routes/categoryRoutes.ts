import { Router } from 'express';
import {
  createCategory,
  deleteCategoryById,
  editCategoryById,
  getCategories,
  getCategoryById,
} from '../controller/categoryController';
import { validateParams } from '../validator/paramsValidator';
import {
  authorizePermission,
  validateToken,
} from '../middlewares/authMiddleware';
import { validateCreateCategory } from '../validator/categoryValidator';

const router = Router();

router.get('/', getCategories);
router.get('/:id', validateParams('id'), getCategoryById);
router.post(
  '/',
  validateToken,
  authorizePermission('add_category'),
  validateCreateCategory,
  createCategory
);
router.put(
  '/:id',
  validateToken,
  authorizePermission('edit_category'),
  validateParams('id'),
  validateCreateCategory,
  editCategoryById
);
router.delete(
  '/:id',
  validateToken,
  authorizePermission('delete_category'),
  validateParams('id'),
  deleteCategoryById
);

export default router;
