import { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';

const productSchema = z.object({
  name: z.string({
    errorMap: () => ({ message: 'Product name is required' }),
  }),
  description: z.string({
    errorMap: () => ({ message: 'Product description is required' }),
  }),
  price: z.number({
    errorMap: () => ({ message: 'Product price is required' }),
  }),
  stock: z.number({
    errorMap: () => ({ message: 'Product stock is required' }),
  }),
  categoryId: z.number({
    errorMap: () => ({ message: 'Product category is required' }),
  }),
  images: z.array(z.string()).optional(),
});

export const validateProductInput = async (
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
    productSchema.parse(req.body);
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
