import { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';

const registerSchema = z.object({
  fullname: z.string({
    errorMap: () => ({ message: 'Fullname is required' }),
  }),
  username: z.string({
    errorMap: () => ({ message: 'Username is required' }),
  }),
  email: z.string().email({
    message: 'Please provide a valid email',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters',
    })
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  address: z.string({
    errorMap: () => ({ message: 'Address is required' }),
  }),
  roleId: z.number({
    errorMap: () => ({ message: 'Role ID is required' }),
  }),
});

export const validateRegisterRequest = async (
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

    await registerSchema.parseAsync(req.body);

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
