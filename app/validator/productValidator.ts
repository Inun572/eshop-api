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
    await productSchema.parseAsync(req.body);
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

const productUpdateSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Product name must be a string',
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: 'Product description must be a string',
    })
    .optional(),
  price: z
    .number({
      invalid_type_error: 'Product price must be a number',
    })
    .optional(),
  stock: z
    .number({
      invalid_type_error: 'Product stock must be a number',
    })
    .optional(),
  categoryId: z
    .number({
      invalid_type_error: 'Product category must be a number',
    })
    .optional(),
  images: z.array(z.string()).optional(),
});

export const validateEditProductInput = async (
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

    await productUpdateSchema.parseAsync(req.body);

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
