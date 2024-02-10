import { Request, Response } from 'express';
import { getUsers } from '../services/userServices';
import { createToken } from '../services/authServices';

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    if (req.user !== undefined) {
      const token = await createToken(req.user);
      res.json({
        message: 'Success login',
        token,
      });
    }
  } catch (err: unknown) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: err,
    });
  }
};
