import { Injectable } from '@nestjs/common';
import TopicRepository from '../repository/topic.repository';

@Injectable()
export class FindAllTopicsService {
  constructor(private readonly topicRepository: TopicRepository) {}

  execute(subjectId?: string) {
    return this.topicRepository.findMany({
      where: subjectId ? { subjectId } : undefined,
      include: { subject: true },
      orderBy: [
        { subject: { name: 'asc' } },
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });
  }
}
