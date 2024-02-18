import { Request, Response } from 'express';
import {
  addUser,
  getUsers,
  updateUser as updateData,
  hardDeleteUser as hardDeleteData,
  softDeleteUser,
  findUserById,
} from '../services/userServices';
import { hashPassword } from '../utils/hashing';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { registerUserTransaction } from '../services/transactions/userTransactions';

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

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await findUserById(Number(req.params.id));

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.json({
      message: 'Success get user by id',
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

    const hashedPassword = await hashPassword(password);

    await registerUserTransaction({
      ...req.body,
      password: hashedPassword,
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

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await updateData(id, req.body);

    res.json({
      message: 'Success update user',
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return res.status(400).json({
        message: err.meta?.cause,
      });
    }

    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const deactiveUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await softDeleteUser(id);

    res.json({
      message: 'Success deactive user',
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return res.status(400).json({
        message: err.meta?.cause,
      });
    }

    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const hardDeleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await hardDeleteData(id);

    res.json({
      message: 'Success delete user',
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return res.status(400).json({
        message: err.meta?.cause,
      });
    }

    res.status(500).json({
      message: 'Internal Server Error',
      error: err,
    });
  }
};
