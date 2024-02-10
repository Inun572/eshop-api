import { NextFunction, Request, Response } from 'express';
import { findToken } from '../services/authServices';
import { verifyToken } from '../utils/token';

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const verifiedToken = await findToken(token);

  if (!verifiedToken) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }

  const isExpired = verifyToken(token);

  if (!isExpired) {
    return res.status(401).json({
      message: 'Token expired',
    });
  }

  req.user = verifiedToken.user;

  next();
};
