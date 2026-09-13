import { Injectable } from '@nestjs/common';
import {
  updateTopicSchema,
  type UpdateTopicDto,
} from '../dto/update-topic.dto';
import { FindOneTopicService } from './find-one-topic.service';
import TopicRepository from '../repository/topic.repository';
import { ValidateInput } from 'src/common/zod/zod-decorator';

@Injectable()
export class UpdateTopicService {
  constructor(
    private readonly topicRepository: TopicRepository,
    private readonly findOneTopicService: FindOneTopicService,
  ) {}

  @ValidateInput(updateTopicSchema)
  async execute(id: string, updateTopicDto: UpdateTopicDto) {
    await this.findOneTopicService.execute({ topicId: id });
    return this.topicRepository.update({
      where: { id },
      data: updateTopicDto,
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
