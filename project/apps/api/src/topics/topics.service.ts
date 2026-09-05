import { Injectable } from '@nestjs/common';
import type { CreateTopicDto } from './dto/create-topic.dto';
import type { UpdateTopicDto } from './dto/update-topic.dto';
import { CreateTopicService } from './services/create-topic.service';
import { FindAllTopicsService } from './services/find-all-topics.service';
import { FindOneTopicService } from './services/find-one-topic.service';
import { UpdateTopicService } from './services/update-topic.service';
import { RemoveTopicService } from './services/remove-topic.service';

@Injectable()
export class TopicsService {
  constructor(
    private readonly createTopicService: CreateTopicService,
    private readonly findAllTopicsService: FindAllTopicsService,
    private readonly findOneTopicService: FindOneTopicService,
    private readonly updateTopicService: UpdateTopicService,
    private readonly removeTopicService: RemoveTopicService,
  ) {}

  create(createTopicDto: CreateTopicDto) {
    return this.createTopicService.execute(createTopicDto);
  }

  findAll(subjectId?: string, noticeId?: string) {
    return this.findAllTopicsService.execute({ subjectId, noticeId });
  }

  findOne(id: string) {
    return this.findOneTopicService.execute(id);
  }

  update(id: string, updateTopicDto: UpdateTopicDto) {
    return this.updateTopicService.execute(id, updateTopicDto);
  }

  remove(id: string) {
    return this.removeTopicService.execute(id);
  }
}
