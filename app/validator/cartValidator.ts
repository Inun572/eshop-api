import { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';

const addCartSchema = z.object({
  productId: z.number({
    invalid_type_error: 'Invalid product ID',
    required_error: 'Product ID is required',
  }),

  quantity: z.number({
    invalid_type_error: 'Invalid quantity amount',
    required_error: 'Quantity is required',
  }),

  userId: z.number({ invalid_type_error: 'Invalid user ID' }).optional(),
});

export const validateItemToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: 'Please provide a product id and quantity',
      });
    }

    await addCartSchema.parseAsync(req.body);

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
