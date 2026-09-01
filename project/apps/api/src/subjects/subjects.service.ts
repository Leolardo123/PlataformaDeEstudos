import { Injectable } from '@nestjs/common';
import type { CreateSubjectDto } from './dto/create-subject.dto';
import type { UpdateSubjectDto } from './dto/update-subject.dto';
import { CreateSubjectService } from './services/create-subject.service';
import { FindAllSubjectsService } from './services/find-all-subjects.service';
import { FindOneSubjectService } from './services/find-one-subject.service';
import { UpdateSubjectService } from './services/update-subject.service';
import { RemoveSubjectService } from './services/remove-subject.service';

@Injectable()
export class SubjectsService {
  constructor(
    private readonly createSubjectService: CreateSubjectService,
    private readonly findAllSubjectsService: FindAllSubjectsService,
    private readonly findOneSubjectService: FindOneSubjectService,
    private readonly updateSubjectService: UpdateSubjectService,
    private readonly removeSubjectService: RemoveSubjectService,
  ) {}

  create(createSubjectDto: CreateSubjectDto) {
    return this.createSubjectService.execute(createSubjectDto);
  }

  findAll() {
    return this.findAllSubjectsService.execute();
  }

  findOne(id: string) {
    return this.findOneSubjectService.execute(id);
  }

  update(id: string, updateSubjectDto: UpdateSubjectDto) {
    return this.updateSubjectService.execute(id, updateSubjectDto);
  }

  remove(id: string) {
    return this.removeSubjectService.execute(id);
  }
}
