import { Request, Response } from 'express';
import { findProduct, getProducts } from '../services/productServices';
import TransactionError from '../errors/transactionError';
import {
  addProductAndImages,
  editProductAndImages,
} from '../services/transactions/productTransactions';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await getProducts();

    if (!products) {
      return res.status(400).json({
        message: 'Product not found',
      });
    }

    res.json({
      message: 'Success get all products',
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await findProduct(Number(req.params.id));

    if (!product) {
      return res.status(400).json({
        message: 'Product not found',
      });
    }

    res.json({
      message: 'Success get product by id',
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { images, ...productBody } = req.body;
    const product = {
      ...productBody,
      sellerId: req.user?.id,
    };

    await addProductAndImages(product, images);

    res.json({
      message: 'Success create product',
    });
  } catch (err) {
    if (err instanceof TransactionError) {
      res.status(err.statusCode).json({
        message: err.message,
      });
    }
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const editProductById = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);
    const { images, ...product } = req.body;

    const productById = await findProduct(productId);

    if (!productById) {
      return res.status(400).json({
        message: 'Product not found',
      });
    }

    await editProductAndImages(productId, product, images);

    res.json({
      message: 'Success edit product',
    });
  } catch (err) {
    if (err instanceof TransactionError) {
      res.status(err.statusCode).json({
        message: err.message,
      });
    }
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
