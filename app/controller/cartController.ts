import { Request, Response } from 'express';
import {
  findCartByUserId,
  getCarts,
  updateQuantity,
} from '../services/cartServices';
import NotFoundError from '../errors/notFoundError';
import {
  addItemTransaction,
  removeItemTransaction,
} from '../services/transactions/cartTransactions';

export const getAllCarts = async (req: Request, res: Response) => {
  try {
    const carts = await getCarts();

    res.json({
      message: 'Success get carts',
      data: carts,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const getCartByUserId = async (req: Request, res: Response) => {
  try {
    const user = await findCartByUserId(Number(req.params.id));

    if (!user) {
      return res.status(400).json({
        message: 'Cart not found',
      });
    }

    res.json({
      message: 'Success get cart',
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const addItemToCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    const user = req.user;

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    const cart = await findCartByUserId(user.id);

    if (!cart) {
      return res.status(400).json({
        message: 'Cart not found',
      });
    }

    await addItemTransaction(cart.id, productId, quantity);

    res.json({
      message: 'Success add item to cart',
    });
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const updateQuantityItemInCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const user = req.user;

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const cart = await findCartByUserId(user.id);

    if (!cart) {
      throw new NotFoundError('Cart not found');
    }

    await updateQuantity(cart.id, productId, quantity);

    res.json({
      message: 'Success update quantity item in cart',
    });
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const removeItemFromCart = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const user = req.user;

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const cart = await findCartByUserId(user.id);

    if (!cart) {
      throw new NotFoundError('Cart not found');
    }

    await removeItemTransaction(cart.id, Number(productId));

    res.json({
      message: 'Success remove item from cart',
    });
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
