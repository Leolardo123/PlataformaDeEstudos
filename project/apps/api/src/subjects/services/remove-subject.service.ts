import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FindOneSubjectService } from './find-one-subject.service';
import AppError from 'src/error/AppError.error';
import StatusCodes from 'src/error/StatusCodes.error';

@Injectable()
export class RemoveSubjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findOneSubjectService: FindOneSubjectService,
  ) {}

  async execute(id: string) {
    await this.findOneSubjectService.execute(id);

    const hasTopics = await this.prisma.topic.findFirst({
      where: { subjectId: id },
    });

    if (hasTopics) {
      throw new AppError(
        'Não é possível remover a disciplina, pois existem tópicos associados a ela.',
        StatusCodes.BAD_REQUEST,
      );
    }

    return this.prisma.subject.delete({ where: { id } });
  }
}
