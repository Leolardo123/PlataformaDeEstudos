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
  UsePipes,
} from '@nestjs/common';
import { NoticesService } from './notices.service';
import {
  createNoticeSchema,
  type CreateNoticeDto,
} from './dto/create-notice.dto';
import {
  updateNoticeSchema,
  type UpdateNoticeDto,
} from './dto/update-notice.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ZodValidationPipe } from '../common/zod-validation.pipe';

@Controller('notices')
@UseGuards(JwtAuthGuard)
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createNoticeSchema))
  create(@Body() createNoticeDto: CreateNoticeDto) {
    return this.noticesService.create(createNoticeDto);
  }

  @Get()
  findAll() {
    return this.noticesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.noticesService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateNoticeSchema))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateNoticeDto: UpdateNoticeDto,
  ) {
    return this.noticesService.update(id, updateNoticeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.noticesService.remove(id);
  }
}
