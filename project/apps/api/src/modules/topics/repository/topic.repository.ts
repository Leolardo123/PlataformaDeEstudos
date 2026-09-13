import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AbstractRepository } from 'src/prisma/repository/Abstract.respository';

@Injectable()
class TopicRepository extends AbstractRepository<'Topic'> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'Topic');
  }
}

export default TopicRepository;
