import { Request, Response } from 'express';
import { findCartByUserId, getCarts } from '../services/cartServices';
import NotFoundError from '../errors/notFoundError';
import {
  addItemTransaction,
  removeItemTransaction,
  updateQuantityTransaction,
} from '../services/transactions/cartTransactions';
import TransactionError from '../errors/transactionError';

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
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    if (req.user?.role_id === 1) {
      const customerId = Number(req.params.id);

      const cart = await findCartByUserId(customerId);

      if (!cart) {
        return res.status(400).json({
          message: 'Cart not found',
        });
      }

      return res.json({
        message: 'Success get cart',
        data: cart,
      });
    }

    const cart = await findCartByUserId(userId);

    if (!cart) {
      return res.status(400).json({
        message: 'Cart not found',
      });
    }

    res.json({
      message: 'Success get cart',
      data: cart,
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

    if (user.role_id === 1) {
      const { userId } = req.body;

      const cart = await findCartByUserId(userId);

      if (!cart) {
        return res.status(400).json({
          message: 'Cart not found',
        });
      }

      await addItemTransaction(cart.id, productId, quantity);

      return res.json({
        message: 'Success add item to cart',
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

    if (user.role_id === 1) {
      const { userId } = req.body;

      const cart = await findCartByUserId(userId);

      if (!cart) {
        throw new NotFoundError('Cart not found');
      }

      await updateQuantityTransaction(cart.id, productId, quantity);

      return res.json({
        message: 'Success update quantity item in cart',
      });
    }

    const cart = await findCartByUserId(user.id);

    if (!cart) {
      throw new NotFoundError('Cart not found');
    }

    await updateQuantityTransaction(cart.id, productId, quantity);

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

    if (user.role_id === 1) {
      const { userId } = req.body;
      console.log(userId);
      const cart = await findCartByUserId(userId);

      if (!cart) {
        throw new NotFoundError('Cart not found');
      }

      await removeItemTransaction(cart.id, Number(productId));

      return res.json({
        message: 'Success remove item from cart',
      });
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
    console.log(err);
    if (err instanceof NotFoundError || err instanceof TransactionError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
