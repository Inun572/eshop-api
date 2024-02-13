import { Request, Response } from 'express';
import { addItem, findCartByUserId } from '../services/cartServices';

export const getAllCarts = async (req: Request, res: Response) => {
  try {
  } catch (err) {}
};

export const addItemToCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({
        message: 'Please provide a Product ID and quantity',
      });
    }

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
