import { Injectable } from '@nestjs/common';
import type { CreateFlashcardDto } from './dto/create-flashcard.dto';
import type { UpdateFlashcardDto } from './dto/update-flashcard.dto';
import { CreateFlashcardService } from './services/create-flashcard.service';
import { FindAllFlashcardsService } from './services/find-all-flashcards.service';
import { FindOneFlashcardService } from './services/find-one-flashcard.service';
import { UpdateFlashcardService } from './services/update-flashcard.service';
import { RemoveFlashcardService } from './services/remove-flashcard.service';

@Injectable()
export class FlashcardsService {
  constructor(
    private readonly createFlashcardService: CreateFlashcardService,
    private readonly findAllFlashcardsService: FindAllFlashcardsService,
    private readonly findOneFlashcardService: FindOneFlashcardService,
    private readonly updateFlashcardService: UpdateFlashcardService,
    private readonly removeFlashcardService: RemoveFlashcardService,
  ) {}

  create(createFlashcardDto: CreateFlashcardDto) {
    return this.createFlashcardService.execute(createFlashcardDto);
  }

  findAll() {
    return this.findAllFlashcardsService.execute();
  }

  findOne(id: string) {
    return this.findOneFlashcardService.execute(id);
  }

  update(id: string, updateFlashcardDto: UpdateFlashcardDto) {
    return this.updateFlashcardService.execute(id, updateFlashcardDto);
  }

  remove(id: string) {
    return this.removeFlashcardService.execute(id);
  }
}
