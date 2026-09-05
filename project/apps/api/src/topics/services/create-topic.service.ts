import { Injectable } from '@nestjs/common';
import type { CreateTopicDto } from '../dto/create-topic.dto';
import TopicRepository from '../repository/topic.repository';

@Injectable()
export class CreateTopicService {
  constructor(private readonly topicRepository: TopicRepository) {}

  execute(createTopicDto: CreateTopicDto) {
    return this.topicRepository.create({
      data: {
        name: createTopicDto.name,
        description: createTopicDto.description,
        contentRichText: createTopicDto.contentRichText,
        contentPdfUrls: createTopicDto.contentPdfUrls,
        contentVideoUrls: createTopicDto.contentVideoUrls,
        contentLinkUrls: createTopicDto.contentLinkUrls,
        order: createTopicDto.order,
        status: createTopicDto.status,
        subjectId: createTopicDto.subjectId,
      },
      include: {
        subject: {
          include: {
            notices: {
              include: { notice: true },
            },
          },
        },
      },
    });
  }
}
