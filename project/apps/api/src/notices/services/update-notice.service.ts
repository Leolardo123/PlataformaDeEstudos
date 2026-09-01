import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { UpdateNoticeDto } from '../dto/update-notice.dto';
import { FindOneNoticeService } from './find-one-notice.service';

@Injectable()
export class UpdateNoticeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findOneNoticeService: FindOneNoticeService,
  ) {}

  async execute(id: string, updateNoticeDto: UpdateNoticeDto) {
    await this.findOneNoticeService.execute(id);
    return this.prisma.notice.update({
      where: { id },
      data: updateNoticeDto,
    });
  }
}
