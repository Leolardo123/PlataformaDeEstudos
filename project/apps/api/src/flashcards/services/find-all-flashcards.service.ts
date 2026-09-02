import { Injectable } from '@nestjs/common';
import FlashcardRepository from '../repository/flashcard.repository';

@Injectable()
export class FindAllFlashcardsService {
  constructor(private readonly flashcardRepository: FlashcardRepository) {}

  execute() {
    return this.flashcardRepository.findMany({
      include: { topic: true },
      orderBy: [
        { topic: { name: 'asc' } },
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });
  }
}
