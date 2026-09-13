import { Injectable } from '@nestjs/common';
import {
  createSubjectSchema,
  type CreateSubjectDto,
} from '../dto/create-subject.dto';
import SubjectRepository from '../repository/subject.repository';
import { ValidateInput } from 'src/common/zod/zod-decorator';

@Injectable()
export class CreateSubjectService {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  @ValidateInput(createSubjectSchema)
  execute(createSubjectDto: CreateSubjectDto) {
    const { noticeIds, ...subjectData } = createSubjectDto;

    return this.subjectRepository.create({
      data: {
        ...subjectData,
        notices: noticeIds?.length
          ? {
              create: noticeIds.map((noticeId) => ({
                notice: { connect: { id: noticeId } },
              })),
            }
          : undefined,
      },
    });
  }
}
