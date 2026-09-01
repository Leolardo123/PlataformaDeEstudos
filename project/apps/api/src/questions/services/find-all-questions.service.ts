import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FindAllQuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  execute() {
    return this.prisma.question.findMany({
      include: {
        alternatives: { orderBy: { order: 'asc' } },
        topics: { include: { topic: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
