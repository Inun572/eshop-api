import { Request, Response } from 'express';
import {
  createOrderTransaction,
  paymentOrderTransaction,
} from '../services/transactions/orderTransactions';
import TransactionError from '../errors/transactionError';
import NotFoundError from '../errors/notFoundError';
import {
  getOrderBySeller,
  getOrders,
  getOrdersByUser,
} from '../services/orderServices';

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getOrders();

    if (orders.length === 0) {
      throw new NotFoundError('Orders is empty');
    }

    res.json({
      message: 'Success get all orders',
      data: orders,
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

export const getAllOrderSeller = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const orders = await getOrderBySeller(userId as number);

    if (orders.length === 0) {
      throw new NotFoundError('Orders is empty');
    }

    res.json({
      message: 'Success get all orders',
      data: orders,
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

export const getAllOrderUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const orders = await getOrdersByUser(userId as number);

    if (orders.length === 0) {
      throw new NotFoundError('Orders is empty');
    }

    res.json({
      message: 'Success get all orders',
      data: orders,
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

export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    await createOrderTransaction(userId as number);
    res.json({
      message: 'Success create order',
    });
  } catch (err) {
    if (err instanceof TransactionError || err instanceof NotFoundError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const paymentOrder = async (req: Request, res: Response) => {
  try {
    const { orderId, ...paymentData } = req.body;
    const userId = req.user?.id;

    const isOrderExits = await getOrdersByUser(userId as number);

    if (isOrderExits.filter((order) => order.id === orderId).length === 0) {
      throw new NotFoundError('Order not found');
    }

    const result = await paymentOrderTransaction(orderId, paymentData);

    res.json({
      message: `Success payment order with ID ${result.id}`,
      data: result.paymentResult.data,
    });
  } catch (err) {
    if (err instanceof TransactionError || err instanceof NotFoundError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const updateStatusOrder = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
