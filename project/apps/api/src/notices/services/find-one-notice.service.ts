import { Injectable, NotFoundException } from '@nestjs/common';
import NoticeRepository from '../repository/notice.repository';

@Injectable()
export class FindOneNoticeService {
  constructor(private readonly noticeRepository: NoticeRepository) {}

  async execute(id: string) {
    const notice = await this.noticeRepository.findUnique({
      where: { id },
    });
    if (!notice) {
      throw new NotFoundException('Notice not found.');
    }

    return notice;
  }
}
