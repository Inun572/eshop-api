import prisma from '../../app/config/db';
import { getToken } from '../utils/token';

export const getUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createToken = async (user: UserPublicData) => {
  const token = getToken(user);
  return await prisma.token.create({
    data: {
      token,
      user_id: user.id,
      expire_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    select: { token: true },
  });
};

export const findToken = async (token: string) => {
  return await prisma.token.findUnique({
    where: { token },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          is_active: true,
          role_id: true,
        },
      },
    },
  });
};
