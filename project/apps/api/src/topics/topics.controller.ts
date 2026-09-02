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
import { z } from 'zod';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ZodValidationPipe } from '../common/zod-validation.pipe';
import { createTopicSchema, type CreateTopicDto } from './dto/create-topic.dto';
import { updateTopicSchema, type UpdateTopicDto } from './dto/update-topic.dto';
import { TopicsService } from './topics.service';

const subjectIdQuerySchema = z.uuid();

@Controller('topics')
@UseGuards(JwtAuthGuard)
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createTopicSchema))
    createTopicDto: CreateTopicDto,
  ) {
    return this.topicsService.create(createTopicDto);
  }

  @Get()
  findAll(@Query('subjectId') subjectId?: string) {
    if (subjectId) {
      return this.topicsService.findAll(subjectIdQuerySchema.parse(subjectId));
    }

    return this.topicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.topicsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(updateTopicSchema))
    updateTopicDto: UpdateTopicDto,
  ) {
    return this.topicsService.update(id, updateTopicDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.topicsService.remove(id);
  }
}
