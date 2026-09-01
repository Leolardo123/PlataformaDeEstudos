import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FindOneTopicService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    const topic = await this.prisma.topic.findUnique({
      where: { id },
      include: { subject: true },
    });

    if (!topic) {
      throw new NotFoundException('Topic not found.');
    }

    return topic;
  }
}
