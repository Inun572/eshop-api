import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { UserPublicData } from '../../types/auth';

config();

export const getToken = (payload: UserPublicData) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRES_TIME as string,
    }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET as string
  );
};
