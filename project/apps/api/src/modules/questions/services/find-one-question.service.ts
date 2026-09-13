import { Injectable, NotFoundException } from '@nestjs/common';
import QuestionRepository from '../repository/question.repository';
import {
  type FindOneQuestionDto,
  findOneQuestionSchema,
} from '../dto/find-one-question.dto';
import { ValidateInput } from 'src/common/zod/zod-decorator';

@Injectable()
export class FindOneQuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  @ValidateInput(findOneQuestionSchema)
  async execute({ id }: FindOneQuestionDto) {
    const question = await this.questionRepository.findUnique({
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
