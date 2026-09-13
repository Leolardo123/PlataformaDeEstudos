import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AbstractRepository } from 'src/prisma/repository/Abstract.respository';

@Injectable()
class UserRepository extends AbstractRepository<'User'> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'User');
  }
}

export default UserRepository;
