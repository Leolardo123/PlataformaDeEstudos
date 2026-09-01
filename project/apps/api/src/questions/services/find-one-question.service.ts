import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FindOneQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: {
        alternatives: { orderBy: { order: 'asc' } },
        topics: { include: { topic: true } },
      },
    });

    if (!question) {
      throw new NotFoundException('Question not found.');
    }

    return question;
  }
}
