import { Injectable } from '@nestjs/common';
import {
  createNoticeSchema,
  type CreateNoticeDto,
} from '../dto/create-notice.dto';
import NoticeRepository from '../repository/notice.repository';
import { ValidateInput } from 'src/common/zod/zod-decorator';

@Injectable()
export class CreateNoticeService {
  constructor(private readonly noticeRepository: NoticeRepository) {}

  @ValidateInput(createNoticeSchema)
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
