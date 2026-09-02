import { Injectable, NotFoundException } from '@nestjs/common';
import FlashcardRepository from '../repository/flashcard.repository';

@Injectable()
export class FindOneFlashcardService {
  constructor(private readonly flashcardRepository: FlashcardRepository) {}

  async execute(id: string) {
    const flashcard = await this.flashcardRepository.findUnique({
      where: { id },
      include: { topic: true },
    });

    if (!flashcard) {
      throw new NotFoundException('Flashcard not found.');
    }

    return flashcard;
  }
}
