import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { CreateSubjectService } from './services/create-subject.service';
import { FindAllSubjectsService } from './services/find-all-subjects.service';
import { FindOneSubjectService } from './services/find-one-subject.service';
import { UpdateSubjectService } from './services/update-subject.service';
import { RemoveSubjectService } from './services/remove-subject.service';
import SubjectRepository from './repository/subject.repository';
import TopicRepository from '../topics/repository/topic.repository';

@Module({
  controllers: [SubjectsController],
  providers: [
    // Services
    SubjectsService,
    CreateSubjectService,
    FindAllSubjectsService,
    FindOneSubjectService,
    UpdateSubjectService,
    RemoveSubjectService,

    // Repositories
    SubjectRepository,
    TopicRepository,
  ],
})
export class SubjectsModule {}
