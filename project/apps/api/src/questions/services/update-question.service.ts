import { Injectable } from '@nestjs/common';
import type { UpdateQuestionDto } from '../dto/update-question.dto';
import { FindOneQuestionService } from './find-one-question.service';
import QuestionRepository from '../repository/question.repository';

@Injectable()
export class UpdateQuestionService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly findOneQuestionService: FindOneQuestionService,
  ) {}

  async execute(id: string, updateQuestionDto: UpdateQuestionDto) {
    await this.findOneQuestionService.execute(id);

    const { topicIds, alternatives, ...rest } = updateQuestionDto;

    return this.questionRepository.update({
      where: { id },
      data: {
        ...rest,
        topics: topicIds
          ? {
              deleteMany: {},
              createMany: {
                data: topicIds.map((topicId) => ({ topicId })),
                skipDuplicates: true,
              },
            }
          : undefined,
        alternatives: alternatives
          ? {
              deleteMany: {},
              create: alternatives.map((alternative, index) => ({
                text: alternative.text,
                order: alternative.order ?? index,
                isCorrect: alternative.isCorrect ?? false,
              })),
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
