import { Injectable, NotFoundException } from '@nestjs/common';
import FlashcardRepository from '../repository/flashcard.repository';
import {
  type FindOneFlashcardDto,
  findOneFlashcardSchema,
} from '../dto/find-one-flashcard.dto';
import { ValidateInput } from 'src/common/zod/zod-decorator';

@Injectable()
export class FindOneFlashcardService {
  constructor(private readonly flashcardRepository: FlashcardRepository) {}

  @ValidateInput(findOneFlashcardSchema)
  async execute({ id }: FindOneFlashcardDto) {
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
