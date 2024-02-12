import { ProductImage } from '../../types/product/product';
import prisma from '../config/db';

export const addProductImages = async (data: ProductImage[]) => {
  return await prisma.image.createMany({
    data,
  });
};

export const updateProductImages = async (
  productId: number,
  data: ProductImage[]
) => {
  return await prisma.image.updateMany({
    where: {
      product_id: productId,
    },
    data,
  });
};
