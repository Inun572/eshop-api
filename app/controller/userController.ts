import { Request, Response } from 'express';
import { addUser, getUsers } from '../services/userServices';
import { hashPassword } from '../utils/hashing';
import { ZodError } from 'zod';

export const getAllUsers = async (req: Request, res: Response) => {
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

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const roleId = 3; // 3 for reguler user

    const hashedPassword = await hashPassword(password);

    await addUser({
      ...req.body,
      password: hashedPassword,
      roleId,
    });

    res.json({
      message: 'Success register user',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
