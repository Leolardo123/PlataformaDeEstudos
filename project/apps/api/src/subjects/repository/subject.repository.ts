import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AbstractRepository } from 'src/prisma/repository/Abstract.respository';

@Injectable()
class SubjectRepository extends AbstractRepository<'Subject'> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'Subject');
  }
}

export default SubjectRepository;
