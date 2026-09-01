import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FindOneTopicService } from './find-one-topic.service';

@Injectable()
export class RemoveTopicService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findOneTopicService: FindOneTopicService,
  ) {}

  async execute(id: string) {
    await this.findOneTopicService.execute(id);
    return this.prisma.topic.delete({ where: { id } });
  }
}
