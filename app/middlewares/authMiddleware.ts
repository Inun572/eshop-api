import { NextFunction, Request, Response } from 'express';
import { findPermissionsByRole, findToken } from '../services/authServices';
import { verifyToken } from '../utils/token';
import { TokenExpiredError } from 'jsonwebtoken';

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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

    verifyToken(token);

    req.user = verifiedToken.user;

    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({
        message: 'Token expired',
      });
    }
    next(err);
  }
};

export const authorizePermission = (permission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const permissionRecord = await findPermissionsByRole(req.user.role_id);

    const permissions = permissionRecord.map(
      (record) => record.permission.name
    );

    if (permissions.includes(permission)) {
      next();
    } else {
      return res.status(403).json({
        message: 'Forbidden',
      });
    }
  };
};
