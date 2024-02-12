import { Product } from '../../types/product/product';
import prisma from '../config/db';

export const getProducts = async () => {
  return await prisma.product.findMany({
    include: {
      category: true,
      user: true,
      images: true,
    },
  });
};

export const findProduct = async (id: number) => {
  return await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      user: true,
      images: true,
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
      category_id: data.category_id,
      seller_id: data.seller_id,
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