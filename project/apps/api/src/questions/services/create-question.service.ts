import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { CreateQuestionDto } from '../dto/create-question.dto';

@Injectable()
export class CreateQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  execute(createQuestionDto: CreateQuestionDto) {
    return this.prisma.question.create({
      data: {
        statement: createQuestionDto.statement,
        type: createQuestionDto.type,
        difficulty: createQuestionDto.difficulty,
        explanation: createQuestionDto.explanation,
        status: createQuestionDto.status,
        alternatives: createQuestionDto.alternatives?.length
          ? {
              create: createQuestionDto.alternatives.map((alternative, index) => ({
                text: alternative.text,
                order: alternative.order ?? index,
                isCorrect: alternative.isCorrect ?? false,
              })),
            }
          : undefined,
        topics: createQuestionDto.topicIds?.length
          ? {
              createMany: {
                data: createQuestionDto.topicIds.map((topicId) => ({ topicId })),
                skipDuplicates: true,
              },
            }
          : undefined,
      },
      include: {
        alternatives: { orderBy: { order: 'asc' } },
        topics: { include: { topic: true } },
      },
    });
  }
}
