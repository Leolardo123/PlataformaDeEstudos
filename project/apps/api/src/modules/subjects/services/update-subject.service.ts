import { Injectable } from '@nestjs/common';
import {
  updateSubjectSchema,
  type UpdateSubjectDto,
} from '../dto/update-subject.dto';
import SubjectRepository from '../repository/subject.repository';
import { ValidateInput } from 'src/common/zod/zod-decorator';

@Injectable()
export class UpdateSubjectService {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  @ValidateInput(updateSubjectSchema)
  async execute({ id, ...updateSubjectDto }: UpdateSubjectDto) {
    const subject = await this.subjectRepository.findUnique({
      where: { id },
    });

    if (!subject) {
      throw new Error('Subject not found.');
    }

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
