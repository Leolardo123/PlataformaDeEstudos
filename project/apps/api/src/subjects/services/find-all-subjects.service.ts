import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FindAllSubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  execute() {
    return this.prisma.subject.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
