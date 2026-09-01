import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { CreateTopicDto } from '../dto/create-topic.dto';

@Injectable()
export class CreateTopicService {
  constructor(private readonly prisma: PrismaService) {}

  execute(createTopicDto: CreateTopicDto) {
    return this.prisma.topic.create({
      data: {
        name: createTopicDto.name,
        description: createTopicDto.description,
        order: createTopicDto.order,
        status: createTopicDto.status,
        subjectId: createTopicDto.subjectId,
      },
      include: { subject: true },
    });
  }
}
