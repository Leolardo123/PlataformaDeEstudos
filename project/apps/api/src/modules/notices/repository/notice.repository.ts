import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AbstractRepository } from 'src/prisma/repository/Abstract.respository';

@Injectable()
class NoticeRepository extends AbstractRepository<'Notice'> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma, 'Notice');
  }
}

export default NoticeRepository;
