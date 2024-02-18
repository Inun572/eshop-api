import prisma from '../../config/db';
import NotFoundError from '../../errors/notFoundError';
import TransactionError from '../../errors/transactionError';
import { findCartByUserId } from '../cartServices';

export const createOrderTransaction = async (userId: number) => {
  const cartItem = await findCartByUserId(userId);

  if (!cartItem) {
    throw new NotFoundError('Transaction has failed to find cart item');
  }

  const totalAmount = cartItem.total_amount;

  return prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        date: new Date(),
        order_number: `ORDER-${Date.now()}`,
        cart_id: cartItem.id,
        total_amount: totalAmount,
      },
    });

    if (!newOrder) {
      throw new TransactionError('Transaction has failed to create new order');
    }

    const newOrderItems = await tx.itemOrder.createMany({
      data: cartItem.items.map((item) => ({
        order_id: newOrder.id,
        product_id: item.product_id,
        quantity: item.quantity,
        total: item.total,
      })),
    });

    if (!newOrderItems) {
      throw new TransactionError(
        'Transaction has failed to create new order items'
      );
    }

    const isCartDeleted = await tx.cartItem.deleteMany({
      where: {
        cart_id: cartItem.id,
      },
    });

    if (isCartDeleted.count === 0) {
      throw new TransactionError('Transaction has failed to delete cart item');
    }

    await tx.cart.update({
      where: {
        id: cartItem.id,
      },
      data: {
        total_items: 0,
        total_amount: 0,
      },
    });

    return { ...newOrder, items: newOrderItems };
  });
};
