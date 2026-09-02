import { Module } from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';
import { FlashcardsController } from './flashcards.controller';
import FlashcardRepository from './repository/flashcard.repository';
import { CreateFlashcardService } from './services/create-flashcard.service';
import { FindAllFlashcardsService } from './services/find-all-flashcards.service';
import { FindOneFlashcardService } from './services/find-one-flashcard.service';
import { UpdateFlashcardService } from './services/update-flashcard.service';
import { RemoveFlashcardService } from './services/remove-flashcard.service';

@Module({
  controllers: [FlashcardsController],
  providers: [
    // Services
    FlashcardsService,
    CreateFlashcardService,
    FindAllFlashcardsService,
    FindOneFlashcardService,
    UpdateFlashcardService,
    RemoveFlashcardService,

    // Repository
    FlashcardRepository,
  ],
})
export class FlashcardsModule {}
