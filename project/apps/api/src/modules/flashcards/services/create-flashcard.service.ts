import { Injectable } from '@nestjs/common';
import {
  createFlashcardSchema,
  type CreateFlashcardDto,
} from '../dto/create-flashcard.dto';
import FlashcardRepository from '../repository/flashcard.repository';
import { ValidateInput } from 'src/common/zod/zod-decorator';

@Injectable()
export class CreateFlashcardService {
  constructor(private readonly flashcardRepository: FlashcardRepository) {}

  @ValidateInput(createFlashcardSchema)
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
