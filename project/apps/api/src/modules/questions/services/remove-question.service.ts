import { Injectable } from '@nestjs/common';
import QuestionRepository from '../repository/question.repository';
import AppError from 'src/error/AppError.error';
import { ValidateInput } from 'src/common/zod/zod-decorator';
import { removeQuestionSchema } from '../dto/remove-question.dto';

@Injectable()
export class RemoveQuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  @ValidateInput(removeQuestionSchema)
  async execute(id: string) {
    const questionExists = await this.questionRepository.findUnique({
      where: { id },
    });

    if (!questionExists) {
      throw new AppError('Questão não encontrada.', 'NOT_FOUND');
    }

    return this.questionRepository.delete({ where: { id } });
  }
}
