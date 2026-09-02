import { Injectable, NotFoundException } from '@nestjs/common';
import SubjectRepository from '../repository/subject.repository';

@Injectable()
export class FindOneSubjectService {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  async execute(id: string) {
    const subject = await this.subjectRepository.findUnique({
      where: { id },
      include: { topics: true },
    });

    if (!subject) {
      throw new NotFoundException('Subject not found.');
    }

    return subject;
  }
}
