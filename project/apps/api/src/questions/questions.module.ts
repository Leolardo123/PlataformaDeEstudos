import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { CreateQuestionService } from './services/create-question.service';
import { FindAllQuestionsService } from './services/find-all-questions.service';
import { FindOneQuestionService } from './services/find-one-question.service';
import { UpdateQuestionService } from './services/update-question.service';
import { RemoveQuestionService } from './services/remove-question.service';

@Module({
  controllers: [QuestionsController],
  providers: [
    QuestionsService,
    CreateQuestionService,
    FindAllQuestionsService,
    FindOneQuestionService,
    UpdateQuestionService,
    RemoveQuestionService,
  ],
})
export class QuestionsModule {}
