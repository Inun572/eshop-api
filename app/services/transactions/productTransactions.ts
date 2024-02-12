import { Product, ProductImage } from '../../../types/product/product';
import prisma from '../../config/db';
import TransactionError from '../../errors/transactionError';
import { addProductImages, updateProductImages } from '../imageProductServices';
import { addProduct, updateProduct } from '../productServices';

export const editProductAndImages = (
  productId: number,
  product: Product,
  images: ProductImage[]
) => {
  return prisma.$transaction(async (tx) => {
    const newProduct = await updateProduct(productId, product);

    if (!newProduct) {
      throw new TransactionError('Transaction has failed to update product');
    }

    const productImages = await updateProductImages(productId, images);

    if (!productImages) {
      throw new TransactionError(
        'Transction has failed to update product images'
      );
    }
  });
};

export const addProductAndImages = (
  product: Product,
  images: ProductImage[]
) => {
  return prisma.$transaction(async (tx) => {
    const newProduct = await addProduct(product);

    if (!newProduct) {
      throw new TransactionError('Transaction has failed to add product');
    }

    const productImages = await addProductImages(images);

    if (!productImages) {
      throw new TransactionError('Transction has failed to add product images');
    }
  });
};
