import { Injectable } from '@nestjs/common';
import type { UpdateNoticeDto } from '../dto/update-notice.dto';
import NoticeRepository from '../repository/notice.repository';
import AppError from 'src/error/AppError.error';

@Injectable()
export class UpdateNoticeService {
  constructor(private readonly noticeRepository: NoticeRepository) {}

  async execute(id: string, updateNoticeDto: UpdateNoticeDto) {
    const notice = await this.noticeRepository.findUnique({ where: { id } });

    if (!notice) {
      throw new AppError('Edital não encontrado.', 'NOT_FOUND');
    }

    return this.noticeRepository.update({
      where: { id },
      data: updateNoticeDto,
    });
  }
}
