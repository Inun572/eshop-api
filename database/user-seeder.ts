import { fakerID_ID } from '@faker-js/faker';
import prisma from '../app/config/db';
import { hashPassword } from '../app/utils/hashing';

const main = async () => {
  await prisma.user.deleteMany();

  const roles = await prisma.role.findMany();
  for (let i = 0; i < 5; i++) {
    await prisma.user.create({
      data: {
        username: fakerID_ID.internet.userName(),
        email: fakerID_ID.internet.email().toLowerCase(),
        fullname: fakerID_ID.person.fullName(),
        address: fakerID_ID.location.city(),
        password: await hashPassword(`Password${i}`),
        role_id: roles[Math.floor(Math.random() * roles.length)].id,
      },
    });
  }
};

main()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
