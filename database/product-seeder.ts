import prisma from '../app/config/db';
import { products } from './dummy-product';

const main = async () => {
  await prisma.image.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.itemOrder.deleteMany();
  await prisma.product.deleteMany();

  const sellerId = await prisma.user.findMany({
    where: {
      role_id: 2,
    },
    select: {
      id: true,
    },
  });

  if (sellerId.length === 0) {
    throw new Error('No seller found');
  }

  const productDatas = products.map((product) => {
    return {
      ...product,
      seller_id: sellerId[Math.floor(Math.random() * (sellerId.length - 1))].id,
    };
  });
  await prisma.product.createMany({
    data: productDatas.map((product) => ({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category_id: product.category_id,
      seller_id: product.seller_id,
    })),
  });

  const productId = await prisma.product.findMany({
    select: {
      id: true,
    },
  });

  const productImages = productDatas
    .map((product, index) => {
      return [
        {
          image_url: product.images_url[0],
          product_id: productId[0].id + index,
        },
        {
          image_url: product.images_url[1],
          product_id: productId[0].id + index,
        },
      ];
    })
    .flat();

  await prisma.image.createMany({
    data: productImages,
  });
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
