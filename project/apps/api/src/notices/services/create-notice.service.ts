import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { CreateNoticeDto } from '../dto/create-notice.dto';

@Injectable()
export class CreateNoticeService {
  constructor(private readonly prisma: PrismaService) {}

  execute(createNoticeDto: CreateNoticeDto) {
    return this.prisma.notice.create({
      data: {
        title: createNoticeDto.title,
        message: createNoticeDto.message ?? createNoticeDto.title,
        status: createNoticeDto.status,
      },
    });
  }
}
