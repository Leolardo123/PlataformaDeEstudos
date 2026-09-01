import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FindAllNoticesService {
  constructor(private readonly prisma: PrismaService) {}

  execute() {
    return this.prisma.notice.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
