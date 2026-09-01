import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FindOneNoticeService } from './find-one-notice.service';

@Injectable()
export class RemoveNoticeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findOneNoticeService: FindOneNoticeService,
  ) {}

  async execute(id: string) {
    await this.findOneNoticeService.execute(id);
    return this.prisma.notice.delete({ where: { id } });
  }
}
