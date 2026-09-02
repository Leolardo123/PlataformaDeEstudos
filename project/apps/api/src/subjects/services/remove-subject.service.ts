import { Injectable } from '@nestjs/common';
import { FindOneSubjectService } from './find-one-subject.service';
import AppError from 'src/error/AppError.error';
import HttpStatusCodes from 'src/error/HttpStatusCodes.error';
import SubjectRepository from '../repository/subject.repository';
import TopicRepository from 'src/topics/repository/topic.repository';

@Injectable()
export class RemoveSubjectService {
  constructor(
    private readonly subjectRepository: SubjectRepository,
    private readonly topicRepository: TopicRepository,
    private readonly findOneSubjectService: FindOneSubjectService,
  ) {}

  async execute(id: string) {
    await this.findOneSubjectService.execute(id);

    const relatedTopics = await this.topicRepository.findMany({
      where: { subjectId: id },
      take: 1,
    });
    const hasTopics = relatedTopics.length > 0;

    if (hasTopics) {
      throw new AppError(
        'Não é possível remover a disciplina, pois existem tópicos associados a ela.',
        HttpStatusCodes.BAD_REQUEST,
      );
    }

    return this.subjectRepository.delete({ where: { id } });
  }
}
