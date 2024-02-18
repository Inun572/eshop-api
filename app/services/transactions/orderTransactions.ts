import prisma from '../../config/db';
import NotFoundError from '../../errors/notFoundError';
import TransactionError from '../../errors/transactionError';
import { payment } from '../../utils/paymentGateway';
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

export const paymentOrderTransaction = async (
  orderId: number,
  paymentData: any
) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
      is_paid: false,
      is_delivered: false,
      is_done: false,
      is_cancelled: false,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    throw new NotFoundError('Order ID not found');
  }

  const isStockAvailble = order.items.every(
    (item) => item.product.stock >= item.quantity
  );

  if (!isStockAvailble) {
    throw new TransactionError('Transaction has failed. Stock not available');
  }

  const totalAmount = order.total_amount;

  if (paymentData.amount !== totalAmount) {
    throw new TransactionError(
      'Transaction has failed. Payment amount mismatch'
    );
  }

  const paymentResult = await payment(paymentData);

  if (paymentResult.error) {
    throw new TransactionError(paymentResult.error);
  }

  return prisma.$transaction(async (tx) => {
    const updatedOrder = await tx.order.update({
      where: {
        id: orderId,
      },
      data: {
        is_paid: true,
      },
    });

    if (!updatedOrder) {
      throw new TransactionError(
        'Transaction has failed. Failed to update order status'
      );
    }

    const orderItems = await tx.itemOrder.findMany({
      where: {
        order_id: orderId,
      },
    });

    for (const item of orderItems) {
      const updatedProduct = await tx.product.update({
        where: {
          id: item.product_id,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });

      if (!updatedProduct) {
        throw new TransactionError(
          'Transaction has failed. Failed to update product stock'
        );
      }
    }

    return { ...updatedOrder, paymentResult };
  });
};
