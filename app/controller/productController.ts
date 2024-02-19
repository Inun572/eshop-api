import { Request, Response } from 'express';
import {
  findProduct,
  findProductBySellerId,
  getProducts,
} from '../services/productServices';
import TransactionError from '../errors/transactionError';
import {
  addProductAndImages,
  editProductAndImages,
} from '../services/transactions/productTransactions';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { sort, order, limit, page, search } = req.query;
    if (
      sort === undefined &&
      order === undefined &&
      limit === undefined &&
      page === undefined &&
      search === undefined
    ) {
      const products = await getProducts();

      if (!products) {
        return res.status(400).json({
          message: 'Product not found',
        });
      }

      return res.json({
        message: 'Success get all products',
        data: products,
      });
    }

    const products = await getProducts(
      search,
      sort as string,
      order as string,
      Number(limit),
      Number(page)
    );

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
    console.log(err);
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

    const user = req.user;

    if (user?.role_id !== 1) {
      const productData = await findProductBySellerId(user?.id as number);

      if (productData.length === 0) {
        return res.status(403).json({
          message: 'You dont have any product yet',
        });
      }

      const isProductExist = productData.filter(
        (product) => product.id === productId
      );

      if (isProductExist.length === 0) {
        return res.status(400).json({
          message: 'Product not found',
        });
      }
    }

    const productData = await findProduct(productId);

    if (!productData) {
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
