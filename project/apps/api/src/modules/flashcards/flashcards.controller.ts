import {
  ParseUUIDPipe,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  createFlashcardSchema,
  type CreateFlashcardDto,
} from './dto/create-flashcard.dto';
import {
  updateFlashcardSchema,
  type UpdateFlashcardDto,
} from './dto/update-flashcard.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ZodValidationPipe } from '../../common/zod/zod-validation.pipe';
import { CreateFlashcardService } from './services/create-flashcard.service';
import { FindAllFlashcardsService } from './services/find-all-flashcards.service';
import { FindOneFlashcardService } from './services/find-one-flashcard.service';
import { UpdateFlashcardService } from './services/update-flashcard.service';
import { RemoveFlashcardService } from './services/remove-flashcard.service';

@Controller('flashcards')
@UseGuards(JwtAuthGuard)
export class FlashcardsController {
  constructor(
    private readonly createFlashcardService: CreateFlashcardService,
    private readonly findAllFlashcardsService: FindAllFlashcardsService,
    private readonly findOneFlashcardService: FindOneFlashcardService,
    private readonly updateFlashcardService: UpdateFlashcardService,
    private readonly removeFlashcardService: RemoveFlashcardService,
  ) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createFlashcardSchema))
    createFlashcardDto: CreateFlashcardDto,
  ) {
    return this.createFlashcardService.execute(createFlashcardDto);
  }

  @Get()
  findAll() {
    return this.findAllFlashcardsService.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneFlashcardService.execute({ id });
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(updateFlashcardSchema))
    updateFlashcardDto: UpdateFlashcardDto,
  ) {
    return this.updateFlashcardService.execute(id, updateFlashcardDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeFlashcardService.execute(id);
  }
}
