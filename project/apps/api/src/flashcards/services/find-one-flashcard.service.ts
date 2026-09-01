import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FindOneFlashcardService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    const flashcard = await this.prisma.flashcard.findUnique({
      where: { id },
      include: { topic: true },
    });

    if (!flashcard) {
      throw new NotFoundException('Flashcard not found.');
    }

    return flashcard;
  }
}
