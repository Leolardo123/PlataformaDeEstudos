import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AbstractRepository } from 'src/prisma/repository/Abstract.respository';

@Injectable()
class QuestionRepository extends AbstractRepository<'Question'> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma, 'Question');
  }
}

export default QuestionRepository;
