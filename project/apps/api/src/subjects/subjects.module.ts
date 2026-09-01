import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { CreateSubjectService } from './services/create-subject.service';
import { FindAllSubjectsService } from './services/find-all-subjects.service';
import { FindOneSubjectService } from './services/find-one-subject.service';
import { UpdateSubjectService } from './services/update-subject.service';
import { RemoveSubjectService } from './services/remove-subject.service';

@Module({
  controllers: [SubjectsController],
  providers: [
    SubjectsService,
    CreateSubjectService,
    FindAllSubjectsService,
    FindOneSubjectService,
    UpdateSubjectService,
    RemoveSubjectService,
  ],
})
export class SubjectsModule {}
