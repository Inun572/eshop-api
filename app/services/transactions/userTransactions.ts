import { RegisterData } from '../../../types/user/user';
import prisma from '../../config/db';
import TransactionError from '../../errors/transactionError';
import { createCart } from '../cartServices';
import { addUser } from '../userServices';

export const registerUserTransaction = (userData: RegisterData) => {
  return prisma.$transaction(async (tx) => {
    const newUser = await addUser(userData);

    if (!newUser) {
      throw new TransactionError('Transaction has failed to register user');
    }

    const newCart = await createCart(newUser.id);

    if (!newCart) {
      throw new TransactionError('Transaction has failed to create cart');
    }
  });
};
