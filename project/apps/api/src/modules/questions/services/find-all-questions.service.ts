import { Injectable } from '@nestjs/common';
import QuestionRepository from '../repository/question.repository';

@Injectable()
export class FindAllQuestionsService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  execute() {
    return this.questionRepository.findMany({
      include: {
        alternatives: { orderBy: { order: 'asc' } },
        topics: { include: { topic: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
