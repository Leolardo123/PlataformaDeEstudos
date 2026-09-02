import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { CreateFlashcardDto } from '../dto/create-flashcard.dto';
import FlashcardRepository from '../repository/flashcard.repository';

@Injectable()
export class CreateFlashcardService {
  constructor(private readonly flashcardRepository: FlashcardRepository) {}

  execute(createFlashcardDto: CreateFlashcardDto) {
    return this.flashcardRepository.create({
      data: {
        front: createFlashcardDto.front,
        back: createFlashcardDto.back ?? createFlashcardDto.front,
        status: createFlashcardDto.status,
        topicId: createFlashcardDto.topicId,
      },
      include: { topic: true },
    });
  }
}
