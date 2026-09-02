import { Injectable } from '@nestjs/common';
import SubjectRepository from '../repository/subject.repository';

@Injectable()
export class FindAllSubjectsService {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  execute() {
    return this.subjectRepository.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
