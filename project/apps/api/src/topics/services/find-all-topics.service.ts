import { Injectable } from '@nestjs/common';
import TopicRepository from '../repository/topic.repository';

@Injectable()
export class FindAllTopicsService {
  constructor(private readonly topicRepository: TopicRepository) {}

  execute({ subjectId, noticeId }: { subjectId?: string; noticeId?: string }) {
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
