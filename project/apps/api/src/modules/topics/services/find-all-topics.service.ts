import { Injectable } from '@nestjs/common';
import TopicRepository from '../repository/topic.repository';
import {
  findAllTopicsSchema,
  type FindAllTopicsDto,
} from '../dto/find-all-topics.dto';
import { ValidateInput } from 'src/common/zod/zod-decorator';

@Injectable()
export class FindAllTopicsService {
  constructor(private readonly topicRepository: TopicRepository) {}

  @ValidateInput(findAllTopicsSchema)
  execute({ subjectId, noticeId }: FindAllTopicsDto) {
    return this.topicRepository.findMany({
      where: {
        ...(subjectId ? { subjectId } : {}),
        ...(noticeId
          ? {
              subject: {
                notices: {
                  some: { noticeId },
                },
              },
            }
          : {}),
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
      orderBy: [
        { subject: { name: 'asc' } },
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });
  }
}
