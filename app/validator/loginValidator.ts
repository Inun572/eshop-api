import { NextFunction, Request, Response } from 'express';
import { findUser } from '../services/userServices';
import bcrypt from 'bcrypt';
import { ZodError, z } from 'zod';

const loginSchema = z.object({
  username: z
    .string({
      errorMap: () => ({ message: 'Please provide a valid username' }),
    })
    .optional(),
  email: z
    .string()
    .email({
      message: 'Please provide a valid email',
    })
    .optional(),
  password: z
    .string({
      invalid_type_error: 'Please provide a valid password',
      required_error: 'Password is required',
    })
    .min(8, {
      message: 'Password must be at least 8 characters',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
});

export const validateLoginRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await loginSchema.parseAsync(req.body);

    const { username, email, password } = req.body;
    if (!email && !username) {
      return res
        .status(400)
        .json({ message: 'Please provide a username or email' });
    }

    const user = await findUser(email ?? username);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Password incorrect' });
    }

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      is_active: user.is_active,
      role_id: user.role_id,
    };

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
