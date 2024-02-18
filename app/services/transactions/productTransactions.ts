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
    const updatedProduct = await updateProduct(productId, product);

    if (!updatedProduct) {
      throw new TransactionError('Transaction has failed to update product');
    }

    if (images === undefined) {
      return updatedProduct;
    }

    const productImages = await updateProductImages(productId, images);

    if (!productImages) {
      throw new TransactionError(
        'Transction has failed to update product images'
      );
    }

    return updatedProduct;
  });
};

export const addProductAndImages = (product: Product, images: string[]) => {
  return prisma.$transaction(async (tx) => {
    const newProduct = await addProduct(product);

    if (!newProduct) {
      throw new TransactionError('Transaction has failed to add product');
    }

    const imagesData: ProductImage[] = images.map((image) => {
      return {
        image_url: image,
        product_id: newProduct.id,
      };
    });

    const productImages = await addProductImages(imagesData);

    if (!productImages) {
      throw new TransactionError('Transction has failed to add product images');
    }
  });
};
