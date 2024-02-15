import prisma from '../config/db';
import NotFoundError from '../errors/notFoundError';
import { findProduct } from './productServices';

export const getCarts = async () => {
  return await prisma.cart.findMany({
    select: {
      id: true,
      user_id: true,
      user: {
        select: {
          username: true,
          address: true,
        },
      },
      total_items: true,
      total_amount: true,
      items: {
        select: {
          product_id: true,
          product: {
            select: {
              name: true,
              price: true,
            },
          },
          quantity: true,
          total: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const findCartByUserId = async (userId: number) => {
  return await prisma.cart.findFirst({
    where: {
      user_id: userId,
    },
    select: {
      id: true,
      user_id: true,
      user: {
        select: {
          username: true,
          address: true,
        },
      },
      total_items: true,
      total_amount: true,
      items: {
        select: {
          product_id: true,
          product: {
            select: {
              name: true,
              price: true,
            },
          },
          quantity: true,
          total: true,
        },
      },
      createdAt: true,
      updatedAt: true,
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

  if (!product) {
    throw new NotFoundError('Product not found');
  }

  const stock = product.stock;

  if (stock < quantity) {
    throw new NotFoundError('Quantity not available');
  }

  let total = 0;
  if (product) {
    total = product.price * quantity;
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

export const updateQuantity = async (
  cartId: number,
  productId: number,
  quantity: number
) => {
  const product = await findProduct(productId);

  if (!product) {
    throw new NotFoundError('Product not found');
  }

  const stock = product.stock;

  const itemInCart = await prisma.cartItem.findFirst({
    where: {
      cart_id: cartId,
      product_id: productId,
    },
  });

  if (!itemInCart) {
    throw new NotFoundError('Product not found in cart');
  }

  if (stock < quantity) {
    throw new NotFoundError('Quantity not available');
  }

  return await prisma.cartItem.update({
    where: {
      cart_id_product_id: {
        cart_id: cartId,
        product_id: productId,
      },
    },
    data: {
      quantity,
    },
  });
};

export const removeItem = async (cartId: number, productId: number) => {
  return await prisma.cartItem.delete({
    where: {
      cart_id_product_id: {
        cart_id: cartId,
        product_id: productId,
      },
    },
  });
};
