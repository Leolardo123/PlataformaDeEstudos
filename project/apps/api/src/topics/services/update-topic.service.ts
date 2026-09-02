import { Injectable } from '@nestjs/common';
import type { UpdateTopicDto } from '../dto/update-topic.dto';
import { FindOneTopicService } from './find-one-topic.service';
import TopicRepository from '../repository/topic.repository';

@Injectable()
export class UpdateTopicService {
  constructor(
    private readonly topicRepository: TopicRepository,
    private readonly findOneTopicService: FindOneTopicService,
  ) {}

  async execute(id: string, updateTopicDto: UpdateTopicDto) {
    await this.findOneTopicService.execute(id);
    return this.topicRepository.update({
      where: { id },
      data: updateTopicDto,
      include: { subject: true },
    });
  }
}
