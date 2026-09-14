import { Injectable } from '@nestjs/common';
import NoticeRepository from '../repository/notice.repository';

@Injectable()
export class FindAllNoticesService {
  constructor(private readonly noticeRepository: NoticeRepository) {}

  execute() {
    return this.noticeRepository.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        subjects: {
          take: 5,
          include: {
            subject: true,
          },
        },
      },
    });
  }
}
