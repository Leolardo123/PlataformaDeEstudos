import * as argon2 from 'argon2';
import { PrismaClient } from 'generated/prisma/client';

const masterUserSeeder = async (prismaClient: PrismaClient) => {
  console.log('Seeding master user...');
  const masterPassword = process.env.MASTER_USER_PASSWORD as string;

  if (!masterPassword) {
    throw new Error(
      'Master user password is not defined in environment variables.',
    );
  }

  const argon2IdPassword = await argon2.hash(masterPassword);

  const masterUser = await prismaClient.user.create({
    data: {
      email: 'pdemaster@gmail.com',
      passwordHash: argon2IdPassword,
      name: 'Master User',
      role: 'ADMIN',
    },
  });

  console.log('Master user seeded successfully.');
};

export { masterUserSeeder };
