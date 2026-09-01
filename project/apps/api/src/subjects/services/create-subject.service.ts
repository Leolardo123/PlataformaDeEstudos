import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { CreateSubjectDto } from '../dto/create-subject.dto';

@Injectable()
export class CreateSubjectService {
  constructor(private readonly prisma: PrismaService) {}

  execute(createSubjectDto: CreateSubjectDto) {
    return this.prisma.subject.create({ data: createSubjectDto });
  }
}
