import { Injectable } from '@nestjs/common';
import { FindOneQuestionService } from './find-one-question.service';
import QuestionRepository from '../repository/question.repository';

@Injectable()
export class RemoveQuestionService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly findOneQuestionService: FindOneQuestionService,
  ) {}

  async execute(id: string) {
    await this.findOneQuestionService.execute(id);
    return this.questionRepository.delete({ where: { id } });
  }
}
