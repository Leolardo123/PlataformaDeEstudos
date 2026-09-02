import { Injectable, NotFoundException } from '@nestjs/common';
import TopicRepository from '../repository/topic.repository';

@Injectable()
export class FindOneTopicService {
  constructor(private readonly topicRepository: TopicRepository) {}

  async execute(id: string) {
    const topic = await this.topicRepository.findUnique({
      where: { id },
      include: { subject: true },
    });

    if (!topic) {
      throw new NotFoundException('Topic not found.');
    }

    return topic;
  }
}
