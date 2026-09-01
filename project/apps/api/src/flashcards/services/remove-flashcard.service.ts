import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FindOneFlashcardService } from './find-one-flashcard.service';

@Injectable()
export class RemoveFlashcardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findOneFlashcardService: FindOneFlashcardService,
  ) {}

  async execute(id: string) {
    await this.findOneFlashcardService.execute(id);
    return this.prisma.flashcard.delete({ where: { id } });
  }
}
