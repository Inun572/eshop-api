import prisma from '../../config/db';
import NotFoundError from '../../errors/notFoundError';
import TransactionError from '../../errors/transactionError';
import { addItem, removeItem, updateQuantity } from '../cartServices';

export const addItemTransaction = (
  cartId: number,
  productId: number,
  quantity: number
) => {
  return prisma.$transaction(async (tx) => {
    const newItem = await addItem(cartId, productId, quantity);

    if (!newItem) {
      throw new TransactionError('Transaction has failed to add item to cart');
    }

    const updatedCartItem = await tx.cartItem.findMany({
      where: {
        cart_id: cartId,
      },
    });

    await tx.cart.update({
      where: {
        id: cartId,
      },
      data: {
        total_items: updatedCartItem.length,
        total_amount: Number(
          updatedCartItem.reduce((acc, item) => acc + item.total, 0).toFixed(2)
        ),
      },
    });
  });
};

export const updateQuantityTransaction = (
  cartId: number,
  productId: number,
  quantity: number
) => {
  return prisma.$transaction(async (tx) => {
    const updatedItem = await updateQuantity(cartId, productId, quantity);

    if (!updatedItem) {
      throw new TransactionError(
        'Transaction has failed to update item quantity in cart'
      );
    }

    const updatedCartItem = await tx.cartItem.findMany({
      where: {
        cart_id: cartId,
      },
    });

    await tx.cart.update({
      where: {
        id: cartId,
      },
      data: {
        total_items: updatedCartItem.length,
        total_amount: Number(
          updatedCartItem.reduce((acc, item) => acc + item.total, 0).toFixed(2)
        ),
      },
    });
  });
};

export const removeItemTransaction = async (
  cartId: number,
  productId: number
) => {
  const isExistInCart = await prisma.cartItem.findFirst({
    where: {
      cart_id: cartId,
      product_id: productId,
    },
  });

  if (!isExistInCart) {
    throw new NotFoundError('Product not found in cart.');
  }

  return prisma.$transaction(async (tx) => {
    const removedItem = await removeItem(cartId, productId);

    if (!removedItem) {
      throw new TransactionError(
        'Transaction has failed to remove item from cart'
      );
    }

    const updatedCartItem = await tx.cartItem.findMany({
      where: {
        cart_id: cartId,
      },
    });

    await tx.cart.update({
      where: {
        id: cartId,
      },
      data: {
        total_items: updatedCartItem.length,
        total_amount: Number(
          updatedCartItem.reduce((acc, item) => acc + item.total, 0).toFixed(2)
        ),
      },
    });
  });
};
