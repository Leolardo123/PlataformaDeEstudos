import { Injectable } from '@nestjs/common';
import type { CreateQuestionDto } from './dto/create-question.dto';
import type { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateQuestionService } from './services/create-question.service';
import { FindAllQuestionsService } from './services/find-all-questions.service';
import { FindOneQuestionService } from './services/find-one-question.service';
import { UpdateQuestionService } from './services/update-question.service';
import { RemoveQuestionService } from './services/remove-question.service';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly createQuestionService: CreateQuestionService,
    private readonly findAllQuestionsService: FindAllQuestionsService,
    private readonly findOneQuestionService: FindOneQuestionService,
    private readonly updateQuestionService: UpdateQuestionService,
    private readonly removeQuestionService: RemoveQuestionService,
  ) {}

  create(createQuestionDto: CreateQuestionDto) {
    return this.createQuestionService.execute(createQuestionDto);
  }

  findAll() {
    return this.findAllQuestionsService.execute();
  }

  findOne(id: string) {
    return this.findOneQuestionService.execute(id);
  }

  update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return this.updateQuestionService.execute(id, updateQuestionDto);
  }

  remove(id: string) {
    return this.removeQuestionService.execute(id);
  }
}
