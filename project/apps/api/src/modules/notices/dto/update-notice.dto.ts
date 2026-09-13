import { createNoticeSchema } from './create-notice.dto';
import { z } from 'zod';

export const updateNoticeSchema = createNoticeSchema.partial();

export type UpdateNoticeDto = z.infer<typeof updateNoticeSchema>;
