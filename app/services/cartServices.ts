import prisma from '../config/db';
import { findProduct } from './productServices';

export const getAllCarts = async () => {
  return await prisma.cart.findMany({
    include: {
      items: true,
    },
  });
};

export const findCartByUserId = async (userId: number) => {
  return await prisma.cart.findFirst({
    where: {
      user_id: userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const createCart = async (userId: number) => {
  return await prisma.cart.create({
    data: {
      user_id: userId,
      total_items: 0,
      total_amount: 0,
    },
  });
};

export const addItem = async (
  cartId: number,
  productId: number,
  quantity: number
) => {
  const product = await findProduct(productId);
  let total = 0;
  if (product) {
    total = product?.price * quantity;
  }
  return await prisma.cartItem.create({
    data: {
      cart_id: cartId,
      product_id: productId,
      quantity,
      total,
    },
  });
};
