import prisma from '../app/config/db';

const categories = ['Kitchen', 'Sport', 'Electronics', 'Clothing', 'Office'];

const main = async () => {
  await prisma.category.deleteMany();

  await prisma.category.createMany({
    data: categories.map((category) => ({ name: category })),
  });
};

main();
