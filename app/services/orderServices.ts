import prisma from '../config/db';
import { findCartByUserId } from './cartServices';

export const getOrders = async () => {
  return await prisma.order.findMany({
    include: {
      items: true,
      cart: {
        select: {
          user: {
            select: {
              fullname: true,
              username: true,
              address: true,
            },
          },
        },
      },
    },
  });
};

export const getOrderBySeller = async (sellerId: number) => {
  const seller = await prisma.user.findUnique({
    where: {
      id: sellerId,
      role_id: 2,
    },
  });

  if (!seller) {
    throw new Error('Seller not found');
  }

  const productList = await prisma.product.findMany({
    where: {
      seller_id: sellerId,
    },
  });

  return await prisma.itemOrder.findMany({
    where: {
      product_id: {
        in: productList.map((product) => product.id),
      },
    },
    select: {
      order_id: true,
      product_id: true,
      quantity: true,
      total: true,
      product: {
        select: {
          name: true,
          price: true,
          stock: true,
          images: {
            select: {
              image_url: true,
            },
          },
          category: {
            select: {
              name: true,
            },
          },
        },
      },
      order: {
        select: {
          date: true,
          order_number: true,
          is_paid: true,
          is_delivered: true,
          is_done: true,
          is_cancelled: true,
          cart: {
            select: {
              user: {
                select: {
                  fullname: true,
                  username: true,
                  address: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

export const getOrdersByUser = async (userId: number) => {
  const cart = await findCartByUserId(userId);

  if (!cart) {
    throw new Error('Cart not found');
  }

  return await prisma.order.findMany({
    where: {
      cart_id: cart.id,
    },
    include: {
      items: {
        select: {
          product_id: true,
          product: {
            select: {
              name: true,
              price: true,
              images: {
                select: {
                  image_url: true,
                },
              },
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
          quantity: true,
          total: true,
        },
      },
    },
  });
};
