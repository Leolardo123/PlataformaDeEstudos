import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';
import { masterUserSeeder } from './seeders/master-user';
import { connectionString } from '../config/variables';

const prismaPg = new PrismaPg({
  connectionString,
});

const prismaClient = new PrismaClient({
  adapter: prismaPg,
});

async function main() {
  console.log('Using connection string:', connectionString);
  const seederList: any = [masterUserSeeder];

  for (const seeder of seederList) {
    await seeder(prismaClient);
  }
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
