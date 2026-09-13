import { Injectable } from '@nestjs/common';
import {
  updateQuestionSchema,
  type UpdateQuestionDto,
} from '../dto/update-question.dto';
import QuestionRepository from '../repository/question.repository';
import AppError from 'src/error/AppError.error';
import { ValidateInput } from 'src/common/zod/zod-decorator';

@Injectable()
export class UpdateQuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  @ValidateInput(updateQuestionSchema)
  async execute(id: string, updateQuestionDto: UpdateQuestionDto) {
    const questionExists = await this.questionRepository.findUnique({
      where: { id },
      include: {
        alternatives: true,
      },
    });

    if (!questionExists) {
      throw new AppError('Questão não encontrada.', 'NOT_FOUND');
    }

    const { topicIds, alternatives, ...rest } = updateQuestionDto;

    let deletedAlternatives: string[] = [];
    let createdAlternatives: any[] = [];
    let updatedAlternatives: any[] = [];

    if (alternatives) {
      const correctAlternativesCount = alternatives.filter(
        (alt) => alt.isCorrect,
      ).length;

      if (correctAlternativesCount !== 1) {
        throw new AppError(
          'Deve haver exatamente uma alternativa correta.',
          'BAD_REQUEST',
        );
      }

      deletedAlternatives = questionExists.alternatives
        .map((alt) =>
          !alternatives.find((a) => a.id === alt.id) ? alt.id : null,
        )
        .filter(Boolean) as string[];
      createdAlternatives = alternatives.filter((alt) => !alt.id);
      updatedAlternatives = alternatives.filter((alt) => alt.id);
    }

    const updatedQuestion = await this.questionRepository.update({
      where: { id },
      data: {
        ...rest,
        alternatives: {
          create: createdAlternatives.map((alternative, index) => ({
            text: alternative.text,
            order: alternative.order ?? index,
            isCorrect: alternative.isCorrect ?? false,
          })),
          update: updatedAlternatives.map((alternative) => ({
            where: { id: alternative.id },
            data: {
              text: alternative.text,
              order: alternative.order,
              isCorrect: alternative.isCorrect,
            },
          })),
          deleteMany: deletedAlternatives.map((alternativeId) => ({
            id: alternativeId,
          })),
        },
      },
      include: {
        alternatives: { orderBy: { order: 'asc' } },
      },
    });

    return updatedQuestion;
  }
}
