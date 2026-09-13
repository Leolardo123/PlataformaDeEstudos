import { Injectable, NotFoundException } from '@nestjs/common';
import NoticeRepository from '../repository/notice.repository';
import {
  type FindOneNoticeDto,
  findOneNoticeSchema,
} from '../dto/find-one-notice.dto';
import { ValidateInput } from 'src/common/zod/zod-decorator';

@Injectable()
export class FindOneNoticeService {
  constructor(private readonly noticeRepository: NoticeRepository) {}

  @ValidateInput(findOneNoticeSchema)
  async execute({ id }: FindOneNoticeDto) {
    const notice = await this.noticeRepository.findUnique({
      where: { id },
    });
    if (!notice) {
      throw new NotFoundException('Notice not found.');
    }

    return notice;
  }
}
