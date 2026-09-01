import { Injectable } from '@nestjs/common';
import type { CreateNoticeDto } from './dto/create-notice.dto';
import type { UpdateNoticeDto } from './dto/update-notice.dto';
import { CreateNoticeService } from './services/create-notice.service';
import { FindAllNoticesService } from './services/find-all-notices.service';
import { FindOneNoticeService } from './services/find-one-notice.service';
import { UpdateNoticeService } from './services/update-notice.service';
import { RemoveNoticeService } from './services/remove-notice.service';

@Injectable()
export class NoticesService {
  constructor(
    private readonly createNoticeService: CreateNoticeService,
    private readonly findAllNoticesService: FindAllNoticesService,
    private readonly findOneNoticeService: FindOneNoticeService,
    private readonly updateNoticeService: UpdateNoticeService,
    private readonly removeNoticeService: RemoveNoticeService,
  ) {}

  create(createNoticeDto: CreateNoticeDto) {
    return this.createNoticeService.execute(createNoticeDto);
  }

  findAll() {
    return this.findAllNoticesService.execute();
  }

  findOne(id: string) {
    return this.findOneNoticeService.execute(id);
  }

  update(id: string, updateNoticeDto: UpdateNoticeDto) {
    return this.updateNoticeService.execute(id, updateNoticeDto);
  }

  remove(id: string) {
    return this.removeNoticeService.execute(id);
  }
}
