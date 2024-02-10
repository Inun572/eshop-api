import prisma from '../../app/config/db';

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
