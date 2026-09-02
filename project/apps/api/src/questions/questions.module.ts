import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { CreateQuestionService } from './services/create-question.service';
import { FindAllQuestionsService } from './services/find-all-questions.service';
import { FindOneQuestionService } from './services/find-one-question.service';
import { UpdateQuestionService } from './services/update-question.service';
import { RemoveQuestionService } from './services/remove-question.service';
import QuestionRepository from './repository/question.repository';

@Module({
  controllers: [QuestionsController],
  providers: [
    // Services
    QuestionsService,
    CreateQuestionService,
    FindAllQuestionsService,
    FindOneQuestionService,
    UpdateQuestionService,
    RemoveQuestionService,

    // Repositories
    QuestionRepository,
  ],
})
export class QuestionsModule {}
