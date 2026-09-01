import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FindOneNoticeService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    const notice = await this.prisma.notice.findUnique({ where: { id } });
    if (!notice) {
      throw new NotFoundException('Notice not found.');
    }

    return notice;
  }
}
