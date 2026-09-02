import { Injectable } from '@nestjs/common';
import { FindOneTopicService } from './find-one-topic.service';
import TopicRepository from '../repository/topic.repository';

@Injectable()
export class RemoveTopicService {
  constructor(
    private readonly topicRepository: TopicRepository,
    private readonly findOneTopicService: FindOneTopicService,
  ) {}

  async execute(id: string) {
    await this.findOneTopicService.execute(id);
    return this.topicRepository.delete({ where: { id } });
  }
}
