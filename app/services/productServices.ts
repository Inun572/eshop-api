import { Product } from '../../types/product/product';
import prisma from '../config/db';

export const getProducts = async (
  search: any = '',
  sort = 'id',
  order = 'asc',
  limit = 10,
  page = 1
) => {
  const take = limit || 10;
  // const skip = (page - 1) * (limit || 10);

  return await prisma.product.findMany({
    take,
    skip: (page - 1) * (limit || 10),
    where: {
      name: {
        contains: search,
      },
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          username: true,
          address: true,
        },
      },
      images: {
        select: {
          image_url: true,
        },
      },
    },
    orderBy: {
      [sort]: order,
    },
  });
};

export const findProduct = async (id: number) => {
  return await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          username: true,
          address: true,
        },
      },
      images: {
        select: {
          image_url: true,
        },
      },
    },
  });
};

export const findProductBySellerId = async (id: number) => {
  return await prisma.product.findMany({
    where: {
      seller_id: id,
    },
  });
};

export const addProduct = async (data: Product) => {
  return await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      category_id: data.categoryId,
      seller_id: data.sellerId,
    },
  });
};

export const updateProduct = async (id: number, data: Product) => {
  return await prisma.product.update({
    where: {
      id,
    },
    data,
  });
};

export const softDeleteProduct = async (id: number) => {
  return await prisma.product.update({
    where: {
      id,
    },
    data: {
      is_deleted: true,
    },
  });
};

export const hardDeleteProduct = async (id: number) => {
  return await prisma.product.delete({
    where: {
      id,
    },
  });
};
