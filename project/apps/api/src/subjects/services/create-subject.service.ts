import { Injectable } from '@nestjs/common';
import type { CreateSubjectDto } from '../dto/create-subject.dto';
import SubjectRepository from '../repository/subject.repository';

@Injectable()
export class CreateSubjectService {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  execute(createSubjectDto: CreateSubjectDto) {
    return this.subjectRepository.create({ data: createSubjectDto });
  }
}
