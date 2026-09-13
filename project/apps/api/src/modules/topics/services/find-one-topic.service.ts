import { Injectable, NotFoundException } from '@nestjs/common';
import TopicRepository from '../repository/topic.repository';
import { ValidateInput } from 'src/common/zod/zod-decorator';
import {
  type FindOneTopicDto,
  findOneTopicSchema,
} from '../dto/find-one-topic.dto';

@Injectable()
export class FindOneTopicService {
  constructor(private readonly topicRepository: TopicRepository) {}

  @ValidateInput(findOneTopicSchema)
  async execute({ topicId }: FindOneTopicDto) {
    const topic = await this.topicRepository.findUnique({
      where: { id: topicId },
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

    if (!topic) {
      throw new NotFoundException('Topic not found.');
    }

    return topic;
  }
}
