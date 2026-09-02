import { Injectable } from '@nestjs/common';
import type { UpdateFlashcardDto } from '../dto/update-flashcard.dto';
import FlashcardRepository from '../repository/flashcard.repository';
import HttpStatusCodes from 'src/error/HttpStatusCodes.error';
import AppError from 'src/error/AppError.error';

@Injectable()
export class UpdateFlashcardService {
  constructor(private readonly flashcardRepository: FlashcardRepository) {}

  async execute(id: string, updateFlashcardDto: UpdateFlashcardDto) {
    const flashcard = await this.flashcardRepository.findUnique({
      where: { id },
    });

    if (!flashcard) {
      throw new AppError(
        'Flashcard não encontrado.',
        HttpStatusCodes.NOT_FOUND,
      );
    }

    return this.flashcardRepository.update({
      where: { id },
      data: updateFlashcardDto,
      include: { topic: true },
    });
  }
}
