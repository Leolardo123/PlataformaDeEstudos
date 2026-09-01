import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { UpdateTopicDto } from '../dto/update-topic.dto';
import { FindOneTopicService } from './find-one-topic.service';

@Injectable()
export class UpdateTopicService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findOneTopicService: FindOneTopicService,
  ) {}

  async execute(id: string, updateTopicDto: UpdateTopicDto) {
    await this.findOneTopicService.execute(id);
    return this.prisma.topic.update({
      where: { id },
      data: updateTopicDto,
      include: { subject: true },
    });
  }
}
