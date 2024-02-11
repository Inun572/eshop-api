import { Request, Response } from 'express';
import {
  getAllCategories,
  findCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../services/categoryServices';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json({
      message: 'Success get all categories',
      categories,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await findCategoryById(Number(req.params.id));

    if (!category) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }

    res.json({
      message: 'Success get category by id',
      data: category,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    await addCategory(req.body.category);

    res.status(201).json({
      message: 'Success create category',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const editCategoryById = async (req: Request, res: Response) => {
  try {
    await updateCategory(Number(req.params.id), req.body.category);

    res.json({
      message: 'Success update category',
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return res.status(400).json({
        message: err.meta?.cause,
      });
    }
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    await deleteCategory(Number(req.params.id));

    res.json({
      message: 'Success delete category',
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return res.status(400).json({
        message: err.meta?.cause,
      });
    }
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
