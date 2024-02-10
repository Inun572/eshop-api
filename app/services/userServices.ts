import prisma from '../../app/config/db';
import { RegisterData } from '../../types/user/user';

export const getUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      fullname: true,
      is_active: true,
      role: {
        select: {
          name: true,
        },
      },
      products: true,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const addUser = async (data: RegisterData) => {
  return await prisma.user.create({
    data: {
      fullname: data.fullname,
      username: data.username,
      email: data.email,
      password: data.password,
      address: data.address,
      role_id: data.roleId,
    },
  });
};
