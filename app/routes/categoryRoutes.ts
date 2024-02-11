import { Router } from 'express';
import {
  createCategory,
  deleteCategoryById,
  editCategoryById,
  getCategories,
  getCategoryById,
} from '../controller/categoryController';
import { validateParams } from '../validator/paramsValidator';
import { validateToken } from '../middlewares/authMiddleware';
import { validateCreateCategory } from '../validator/categoryValidator';

const router = Router();

router.get('/', getCategories);
router.get('/:id', validateParams('id'), getCategoryById);
router.post('/', validateToken, validateCreateCategory, createCategory);
router.put(
  '/:id',
  validateToken,
  validateParams('id'),
  validateCreateCategory,
  editCategoryById
);
router.delete('/:id', validateToken, validateParams('id'), deleteCategoryById);

export default router;
