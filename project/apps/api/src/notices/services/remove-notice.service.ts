import { Injectable } from '@nestjs/common';
import NoticeRepository from '../repository/notice.repository';
import HttpStatusCodes from 'src/error/HttpStatusCodes.error';
import AppError from 'src/error/AppError.error';

@Injectable()
export class RemoveNoticeService {
  constructor(private readonly noticeRepository: NoticeRepository) {}

  async execute(id: string) {
    const notice = await this.noticeRepository.findUnique({ where: { id } });
    if (!notice) {
      throw new AppError('Edital não encontrado.', HttpStatusCodes.NOT_FOUND);
    }

    return this.noticeRepository.delete({ where: { id } });
  }
}
