import { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';

const categorySchema = z.object({
  category: z.string({
    errorMap: () => ({ message: 'Category name is required' }),
  }),
});

export const validateCreateCategory = async (
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

    categorySchema.parse(req.body);

    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
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
