import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { UpdateFlashcardDto } from '../dto/update-flashcard.dto';
import { FindOneFlashcardService } from './find-one-flashcard.service';

@Injectable()
export class UpdateFlashcardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findOneFlashcardService: FindOneFlashcardService,
  ) {}

  async execute(id: string, updateFlashcardDto: UpdateFlashcardDto) {
    await this.findOneFlashcardService.execute(id);
    return this.prisma.flashcard.update({
      where: { id },
      data: updateFlashcardDto,
      include: { topic: true },
    });
  }
}
