import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { CreateFlashcardDto } from '../dto/create-flashcard.dto';

@Injectable()
export class CreateFlashcardService {
  constructor(private readonly prisma: PrismaService) {}

  execute(createFlashcardDto: CreateFlashcardDto) {
    return this.prisma.flashcard.create({
      data: {
        front: createFlashcardDto.front,
        back: createFlashcardDto.back ?? createFlashcardDto.front,
        order: createFlashcardDto.order,
        status: createFlashcardDto.status,
        topicId: createFlashcardDto.topicId,
      },
      include: { topic: true },
    });
  }
}
