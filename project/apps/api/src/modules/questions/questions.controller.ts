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
import { type CreateQuestionDto } from './dto/create-question.dto';
import {
  updateQuestionSchema,
  type UpdateQuestionDto,
} from './dto/update-question.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ZodValidationPipe } from '../../common/zod/zod-validation.pipe';
import { CreateQuestionService } from './services/create-question.service';
import { FindAllQuestionsService } from './services/find-all-questions.service';
import { FindOneQuestionService } from './services/find-one-question.service';
import { UpdateQuestionService } from './services/update-question.service';
import { RemoveQuestionService } from './services/remove-question.service';

@Controller('questions')
@UseGuards(JwtAuthGuard)
export class QuestionsController {
  constructor(
    private readonly createQuestionService: CreateQuestionService,
    private readonly findAllQuestionsService: FindAllQuestionsService,
    private readonly findOneQuestionService: FindOneQuestionService,
    private readonly updateQuestionService: UpdateQuestionService,
    private readonly removeQuestionService: RemoveQuestionService,
  ) {}

  @Post()
  create(
    @Body()
    createQuestionDto: CreateQuestionDto,
  ) {
    return this.createQuestionService.execute(createQuestionDto);
  }

  @Get()
  findAll() {
    return this.findAllQuestionsService.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneQuestionService.execute({ id });
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(updateQuestionSchema))
    updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.updateQuestionService.execute(id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeQuestionService.execute(id);
  }
}
