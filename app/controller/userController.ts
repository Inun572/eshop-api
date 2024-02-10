import { Request, Response } from 'express';
import { getUsers } from '../services/userServices';

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
