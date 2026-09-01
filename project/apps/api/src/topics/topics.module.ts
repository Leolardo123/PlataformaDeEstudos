import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { CreateTopicService } from './services/create-topic.service';
import { FindAllTopicsService } from './services/find-all-topics.service';
import { FindOneTopicService } from './services/find-one-topic.service';
import { UpdateTopicService } from './services/update-topic.service';
import { RemoveTopicService } from './services/remove-topic.service';

@Module({
  controllers: [TopicsController],
  providers: [
    TopicsService,
    CreateTopicService,
    FindAllTopicsService,
    FindOneTopicService,
    UpdateTopicService,
    RemoveTopicService,
  ],
})
export class TopicsModule {}
