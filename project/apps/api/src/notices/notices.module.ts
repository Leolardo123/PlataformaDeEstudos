import { Module } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { NoticesController } from './notices.controller';
import { CreateNoticeService } from './services/create-notice.service';
import { FindAllNoticesService } from './services/find-all-notices.service';
import { FindOneNoticeService } from './services/find-one-notice.service';
import { UpdateNoticeService } from './services/update-notice.service';
import { RemoveNoticeService } from './services/remove-notice.service';

@Module({
  controllers: [NoticesController],
  providers: [
    NoticesService,
    CreateNoticeService,
    FindAllNoticesService,
    FindOneNoticeService,
    UpdateNoticeService,
    RemoveNoticeService,
  ],
})
export class NoticesModule {}
