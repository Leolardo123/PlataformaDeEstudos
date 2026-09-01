import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FindOneSubjectService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    const subject = await this.prisma.subject.findUnique({
      where: { id },
      include: { topics: true },
    });

    if (!subject) {
      throw new NotFoundException('Subject not found.');
    }

    return subject;
  }
}
