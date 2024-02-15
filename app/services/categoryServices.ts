import prisma from '../config/db';

export const getAllCategories = async () => {
  return await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};

export const findCategoryById = async (id: number) => {
  return await prisma.category.findFirst({
    where: {
      id,
    },
  });
};

export const addCategory = async (name: string) => {
  return await prisma.category.create({
    data: {
      name,
    },
  });
};

export const updateCategory = async (id: number, name: string) => {
  return await prisma.category.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
};

export const deleteCategory = async (id: number) => {
  return await prisma.category.delete({
    where: {
      id,
    },
  });
};
