import { Injectable } from '@nestjs/common';
import FlashcardRepository from '../repository/flashcard.repository';
import HttpStatusCodes from 'src/error/HttpStatusCodes.error';
import AppError from 'src/error/AppError.error';

@Injectable()
export class RemoveFlashcardService {
  constructor(private readonly flashcardRepository: FlashcardRepository) {}

  async execute(id: string) {
    const flashcard = await this.flashcardRepository.findUnique({
      where: { id },
    });

    if (!flashcard) {
      throw new AppError('Flashcard not found.', HttpStatusCodes.NOT_FOUND);
    }

    return this.flashcardRepository.delete({ where: { id } });
  }
}
