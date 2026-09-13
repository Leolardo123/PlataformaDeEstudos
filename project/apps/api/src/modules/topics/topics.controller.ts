import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { type CreateTopicDto } from './dto/create-topic.dto';
import { type UpdateTopicDto } from './dto/update-topic.dto';
import { CreateTopicService } from './services/create-topic.service';
import { FindAllTopicsService } from './services/find-all-topics.service';
import { FindOneTopicService } from './services/find-one-topic.service';
import { UpdateTopicService } from './services/update-topic.service';
import { RemoveTopicService } from './services/remove-topic.service';

@Controller('topics')
@UseGuards(JwtAuthGuard)
export class TopicsController {
  constructor(
    private readonly createTopicService: CreateTopicService,
    private readonly findAllTopicsService: FindAllTopicsService,
    private readonly findOneTopicService: FindOneTopicService,
    private readonly updateTopicService: UpdateTopicService,
    private readonly removeTopicService: RemoveTopicService,
  ) {}

  @Post()
  create(
    @Body()
    createTopicDto: CreateTopicDto,
  ) {
    return this.createTopicService.execute(createTopicDto);
  }

  @Get()
  findAll(
    @Query('subjectId') subjectId?: string,
    @Query('noticeId') noticeId?: string,
  ) {
    return this.findAllTopicsService.execute({
      subjectId,
      noticeId,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneTopicService.execute({ topicId: id });
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateTopicDto: UpdateTopicDto,
  ) {
    return this.updateTopicService.execute(id, updateTopicDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeTopicService.execute(id);
  }
}
