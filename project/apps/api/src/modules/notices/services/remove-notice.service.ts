import { Injectable } from '@nestjs/common';
import NoticeRepository from '../repository/notice.repository';
import AppError from 'src/error/AppError.error';
import {
  type RemoveNoticeDto,
  removeNoticeSchema,
} from '../dto/remove-notice.dto';
import { ValidateInput } from 'src/common/zod/zod-decorator';

@Injectable()
export class RemoveNoticeService {
  constructor(private readonly noticeRepository: NoticeRepository) {}

  @ValidateInput(removeNoticeSchema)
  async execute({ id }: RemoveNoticeDto) {
    const notice = await this.noticeRepository.findUnique({ where: { id } });

    if (!notice) {
      throw new AppError('Edital não encontrado.', 'NOT_FOUND');
    }

    return this.noticeRepository.delete({ where: { id } });
  }
}
