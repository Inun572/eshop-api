import { Request, Response } from 'express';
import {
  getUserByEmail,
  getUsers,
} from '../services/userServices';
import { createToken } from '../services/authServices';

export const getAllUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await getUsers();
    res.json({
      message: 'Success get all users',
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const user = req.user;
    if (user !== undefined) {
      const token = await createToken(user);
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
