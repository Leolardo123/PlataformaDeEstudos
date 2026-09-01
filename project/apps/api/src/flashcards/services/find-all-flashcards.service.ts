import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FindAllFlashcardsService {
  constructor(private readonly prisma: PrismaService) {}

  execute() {
    return this.prisma.flashcard.findMany({
      include: { topic: true },
      orderBy: [
        { topic: { name: 'asc' } },
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });
  }
}
