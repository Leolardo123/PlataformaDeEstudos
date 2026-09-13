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
import { type CreateNoticeDto } from './dto/create-notice.dto';
import {
  updateNoticeSchema,
  type UpdateNoticeDto,
} from './dto/update-notice.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ZodValidationPipe } from '../../common/zod/zod-validation.pipe';
import { CreateNoticeService } from './services/create-notice.service';
import { UpdateNoticeService } from './services/update-notice.service';
import { RemoveNoticeService } from './services/remove-notice.service';
import { FindAllNoticesService } from './services/find-all-notices.service';
import { FindOneNoticeService } from './services/find-one-notice.service';

@Controller('notices')
@UseGuards(JwtAuthGuard)
export class NoticesController {
  constructor(
    private readonly createNoticeService: CreateNoticeService,
    private readonly updateNoticeService: UpdateNoticeService,
    private readonly findAllNoticeService: FindAllNoticesService,
    private readonly findOneNoticeService: FindOneNoticeService,
    private readonly removeNoticeService: RemoveNoticeService,
  ) {}

  @Post()
  create(
    @Body()
    createNoticeDto: CreateNoticeDto,
  ) {
    return this.createNoticeService.execute(createNoticeDto);
  }

  @Get()
  findAll() {
    return this.findAllNoticeService.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneNoticeService.execute({ id });
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(updateNoticeSchema))
    updateNoticeDto: UpdateNoticeDto,
  ) {
    return this.updateNoticeService.execute(id, updateNoticeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeNoticeService.execute({ id });
  }
}
