import { Injectable } from '@nestjs/common';
import { FindOneSubjectService } from './find-one-subject.service';
import AppError from 'src/error/AppError.error';
import SubjectRepository from '../repository/subject.repository';
import TopicRepository from 'src/modules/topics/repository/topic.repository';
import { ValidateInput } from 'src/common/zod/zod-decorator';
import { removeSubjectSchema } from '../dto/remove-subject.dto';

@Injectable()
export class RemoveSubjectService {
  constructor(
    private readonly subjectRepository: SubjectRepository,
    private readonly topicRepository: TopicRepository,
  ) {}

  @ValidateInput(removeSubjectSchema)
  async execute(id: string) {
    const subject = await this.subjectRepository.findUnique({
      where: { id },
    });

    if (!subject) {
      throw new AppError('Disciplina não encontrada.', 'NOT_FOUND');
    }

    const relatedTopics = await this.topicRepository.findMany({
      where: { subjectId: id },
      take: 1,
    });
    const hasTopics = relatedTopics.length > 0;

    if (hasTopics) {
      throw new AppError(
        'Não é possível remover a disciplina, pois existem tópicos associados a ela.',
        'BAD_REQUEST',
      );
    }

    return this.subjectRepository.delete({ where: { id } });
  }
}
