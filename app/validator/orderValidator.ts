import { NextFunction, Request, Response } from 'express';
import z, { ZodError } from 'zod';

const paymentSchema = z.object({
  orderId: z.number({
    invalid_type_error: 'Invalid order ID',
    required_error: 'Order ID is required',
  }),
  amount: z.number({
    invalid_type_error: 'Invalid amount',
    required_error: 'Amount is required',
  }),
  cardNumber: z.string({
    invalid_type_error: 'Invalid card number',
    required_error: 'Card number is required',
  }),
  cvv: z.number({
    invalid_type_error: 'Invalid CVV',
    required_error: 'CVV is required',
  }),
  expiryMonth: z.string({
    invalid_type_error: 'Invalid expiry month',
    required_error: 'Expiry month is required',
  }),
  expiryYear: z.string({
    invalid_type_error: 'Invalid expiry year',
    required_error: 'Expiry year is required',
  }),
});

export const validatePaymentRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body) {
      res.status(400).json({
        message: 'Please provide all required data',
      });
    }

    await paymentSchema.parseAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(422).json({
        message: err.issues
          .reduce((acc: String[], issue) => {
            return [...acc, issue.message];
          }, [])
          .join(', '),
      });
    }
    next(err);
  }
};
