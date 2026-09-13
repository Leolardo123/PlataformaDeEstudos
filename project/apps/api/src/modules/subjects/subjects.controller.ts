import {
  ParseUUIDPipe,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { type CreateSubjectDto } from './dto/create-subject.dto';
import { type UpdateSubjectDto } from './dto/update-subject.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CreateSubjectService } from './services/create-subject.service';
import { UpdateSubjectService } from './services/update-subject.service';
import { RemoveSubjectService } from './services/remove-subject.service';
import { FindOneSubjectService } from './services/find-one-subject.service';
import { FindAllSubjectsService } from './services/find-all-subjects.service';

@Controller('subjects')
@UseGuards(JwtAuthGuard)
export class SubjectsController {
  constructor(
    private readonly createSubjectService: CreateSubjectService,
    private readonly updateSubjectService: UpdateSubjectService,
    private readonly findSubjectService: FindOneSubjectService,
    private readonly findAllSubjectsService: FindAllSubjectsService,
    private readonly removeSubjectService: RemoveSubjectService,
  ) {}

  @Post()
  create(
    @Body()
    createSubjectDto: CreateSubjectDto,
  ) {
    return this.createSubjectService.execute(createSubjectDto);
  }

  @Get()
  findAll() {
    return this.findAllSubjectsService.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findSubjectService.execute({ id });
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateSubjectDto: UpdateSubjectDto,
  ) {
    return this.updateSubjectService.execute({ ...updateSubjectDto, id });
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeSubjectService.execute(id);
  }
}
