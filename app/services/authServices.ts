import prisma from '../config/db';
import { getToken } from '../utils/token';

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
  return await prisma.token.findFirst({
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

export const findPermissionsByRole = async (roleId: number) => {
  return await prisma.permissionRole.findMany({
    where: {
      role_id: roleId,
    },
    include: {
      permission: true,
    },
  });
};
