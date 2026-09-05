import { Injectable } from '@nestjs/common';
import type { CreateQuestionDto } from '../dto/create-question.dto';
import QuestionRepository from '../repository/question.repository';

@Injectable()
export class CreateQuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  execute(createQuestionDto: CreateQuestionDto) {
    return this.questionRepository.create({
      data: {
        statement: createQuestionDto.statement,
        type: createQuestionDto.type,
        difficulty: createQuestionDto.difficulty,
        explanation: createQuestionDto.explanation,
        status: createQuestionDto.status,
        alternatives: createQuestionDto.alternatives?.length
          ? {
              create: createQuestionDto.alternatives.map(
                (alternative, index) => ({
                  text: alternative.text,
                  order: alternative.order ?? index,
                  isCorrect: alternative.isCorrect ?? false,
                }),
              ),
            }
          : undefined,
        topics: createQuestionDto.topicIds?.length
          ? {
              createMany: {
                data: createQuestionDto.topicIds.map((topicId) => ({
                  topicId,
                })),
                skipDuplicates: true,
              },
            }
          : undefined,
      },
      include: {
        alternatives: { orderBy: { order: 'asc' } },
      },
    });
  }
}
