import { Injectable, NotFoundException } from '@nestjs/common';
import QuestionRepository from '../repository/question.repository';

@Injectable()
export class FindOneQuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute(id: string) {
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
