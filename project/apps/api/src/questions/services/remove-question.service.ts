import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FindOneQuestionService } from './find-one-question.service';

@Injectable()
export class RemoveQuestionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findOneQuestionService: FindOneQuestionService,
  ) {}

  async execute(id: string) {
    await this.findOneQuestionService.execute(id);
    return this.prisma.question.delete({ where: { id } });
  }
}
