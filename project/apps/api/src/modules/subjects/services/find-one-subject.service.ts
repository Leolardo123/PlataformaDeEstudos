import { Injectable, NotFoundException } from '@nestjs/common';
import SubjectRepository from '../repository/subject.repository';
import {
  type FindOneSubjectDto,
  findOneSubjectSchema,
} from '../dto/find-one-subject.dto';
import { ValidateInput } from 'src/common/zod/zod-decorator';

@Injectable()
export class FindOneSubjectService {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  @ValidateInput(findOneSubjectSchema)
  async execute({ id }: FindOneSubjectDto) {
    const subject = await this.subjectRepository.findUnique({
      where: { id },
      include: {
        topics: true,
        notices: {
          include: { notice: true },
        },
      },
    });

    if (!subject) {
      throw new NotFoundException('Subject not found.');
    }

    return subject;
  }
}
