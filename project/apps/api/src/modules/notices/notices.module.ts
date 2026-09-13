import { Module } from '@nestjs/common';
import { NoticesController } from './notices.controller';
import { CreateNoticeService } from './services/create-notice.service';
import { FindAllNoticesService } from './services/find-all-notices.service';
import { FindOneNoticeService } from './services/find-one-notice.service';
import { UpdateNoticeService } from './services/update-notice.service';
import { RemoveNoticeService } from './services/remove-notice.service';
import NoticeRepository from './repository/notice.repository';

@Module({
  controllers: [NoticesController],
  providers: [
    // Services
    CreateNoticeService,
    FindAllNoticesService,
    FindOneNoticeService,
    UpdateNoticeService,
    RemoveNoticeService,

    // Repositories
    NoticeRepository,
  ],
})
export class NoticesModule {}
