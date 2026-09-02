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
import { FlashcardsService } from './flashcards.service';
import {
  createFlashcardSchema,
  type CreateFlashcardDto,
} from './dto/create-flashcard.dto';
import {
  updateFlashcardSchema,
  type UpdateFlashcardDto,
} from './dto/update-flashcard.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ZodValidationPipe } from '../common/zod-validation.pipe';

@Controller('flashcards')
@UseGuards(JwtAuthGuard)
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createFlashcardSchema))
    createFlashcardDto: CreateFlashcardDto,
  ) {
    return this.flashcardsService.create(createFlashcardDto);
  }

  @Get()
  findAll() {
    return this.flashcardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.flashcardsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(updateFlashcardSchema))
    updateFlashcardDto: UpdateFlashcardDto,
  ) {
    return this.flashcardsService.update(id, updateFlashcardDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.flashcardsService.remove(id);
  }
}
