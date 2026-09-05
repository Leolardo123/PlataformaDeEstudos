import { Injectable } from '@nestjs/common';
import type { UpdateQuestionDto } from '../dto/update-question.dto';
import { FindOneQuestionService } from './find-one-question.service';
import QuestionRepository from '../repository/question.repository';
import HttpStatusCodes from 'src/error/HttpStatusCodes.error';
import AppError from 'src/error/AppError.error';
import { includes } from 'zod';

@Injectable()
export class UpdateQuestionService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly findOneQuestionService: FindOneQuestionService,
  ) {}

  async execute(id: string, updateQuestionDto: UpdateQuestionDto) {
    const questionExists = await this.questionRepository.findUnique({
      where: { id },
      include: {
        alternatives: true,
      },
    });

    if (!questionExists) {
      throw new AppError('Questão não encontrada.', HttpStatusCodes.NOT_FOUND);
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
          HttpStatusCodes.BAD_REQUEST,
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

    console.log('deletedAlternatives', deletedAlternatives);
    console.log('createdAlternatives', createdAlternatives);
    console.log('updatedAlternatives', updatedAlternatives);

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

    // if (topicIds) {
    //   await this.questionRepository.update({
    //     where: { id },
    //     data: {
    //       topics: {
    //         set: topicIds.map((topicId) => ({ topicId })),
    //       },
    //     },
    //   });
    // }

    return updatedQuestion;
  }
}
