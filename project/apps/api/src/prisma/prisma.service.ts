import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';
import { connectionString } from '../../config/variables';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const datasourceUrl = connectionString;

    if (!datasourceUrl) {
      throw new Error('DATABASE_URL is required to initialize Prisma client.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const adapter = new PrismaPg({ connectionString: datasourceUrl });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
