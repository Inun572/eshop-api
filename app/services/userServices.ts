import prisma from '../../app/config/db';
import { RegisterData, UpdateDataUser } from '../../types/user/user';

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

export const findUser = async (emailOrUsername: string) => {
  return await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: {
            equals: emailOrUsername,
          },
        },
        {
          username: {
            equals: emailOrUsername,
          },
        },
      ],
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

export const updateUser = async (id: number, data: UpdateDataUser) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      fullname: data.fullname,
      username: data.username,
      email: data.email,
      password: data.password,
      address: data.address,
      role_id: data.roleId,
      is_active: data.isActive,
    },
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};
