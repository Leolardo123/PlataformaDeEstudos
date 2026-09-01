import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { UpdateSubjectDto } from '../dto/update-subject.dto';
import { FindOneSubjectService } from './find-one-subject.service';

@Injectable()
export class UpdateSubjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findOneSubjectService: FindOneSubjectService,
  ) {}

  async execute(id: string, updateSubjectDto: UpdateSubjectDto) {
    await this.findOneSubjectService.execute(id);
    return this.prisma.subject.update({
      where: { id },
      data: updateSubjectDto,
    });
  }
}
