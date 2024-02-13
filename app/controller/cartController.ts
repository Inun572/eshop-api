import { Request, Response } from 'express';
import { addItem, findCartByUserId, getCarts } from '../services/cartServices';

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

    await addItem(cart.id, productId, quantity);

    res.json({
      message: 'Success add item to cart',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const updateQuantityItemInCart = async (req: Request, res: Response) => {
  try {
  } catch (err) {}
};

export const removeItemFromCart = async (req: Request, res: Response) => {
  try {
  } catch (err) {}
};
