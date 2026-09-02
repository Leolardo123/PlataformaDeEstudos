import { Injectable } from '@nestjs/common';
import type { CreateNoticeDto } from '../dto/create-notice.dto';
import NoticeRepository from '../repository/notice.repository';

@Injectable()
export class CreateNoticeService {
  constructor(private readonly noticeRepository: NoticeRepository) {}

  execute(createNoticeDto: CreateNoticeDto) {
    return this.noticeRepository.create({
      data: {
        title: createNoticeDto.title,
        message: createNoticeDto.message ?? createNoticeDto.title,
        status: createNoticeDto.status,
      },
    });
  }
}
