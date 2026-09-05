import { Injectable } from '@nestjs/common';
import type { UpdateSubjectDto } from '../dto/update-subject.dto';
import { FindOneSubjectService } from './find-one-subject.service';
import SubjectRepository from '../repository/subject.repository';

@Injectable()
export class UpdateSubjectService {
  constructor(
    private readonly subjectRepository: SubjectRepository,
    private readonly findOneSubjectService: FindOneSubjectService,
  ) {}

  async execute(id: string, updateSubjectDto: UpdateSubjectDto) {
    await this.findOneSubjectService.execute(id);

    const { noticeIds, ...subjectData } = updateSubjectDto;

    return this.subjectRepository.update({
      where: { id },
      data: {
        ...subjectData,
        notices:
          noticeIds === undefined
            ? undefined
            : {
                deleteMany: { subjectId: id },
                create: noticeIds.map((noticeId) => ({
                  notice: { connect: { id: noticeId } },
                })),
              },
      },
    });
  }
}
