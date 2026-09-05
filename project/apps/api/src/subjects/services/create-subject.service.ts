import { Injectable } from '@nestjs/common';
import type { CreateSubjectDto } from '../dto/create-subject.dto';
import SubjectRepository from '../repository/subject.repository';

@Injectable()
export class CreateSubjectService {
  constructor(private readonly subjectRepository: SubjectRepository) {}

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
