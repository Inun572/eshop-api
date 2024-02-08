import { Request, Response } from 'express';
import { getUsers } from '../services/authService';

export const getAllUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getUsers();
    res.json({
      message: 'Success get all users',
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
