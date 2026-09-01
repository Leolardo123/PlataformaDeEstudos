import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FindAllTopicsService {
  constructor(private readonly prisma: PrismaService) {}

  execute(subjectId?: string) {
    return this.prisma.topic.findMany({
      where: subjectId ? { subjectId } : undefined,
      include: { subject: true },
      orderBy: [
        { subject: { name: 'asc' } },
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });
  }
}
