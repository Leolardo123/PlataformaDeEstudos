import { RecordStatus } from '../../../generated/prisma/enums';
import { z } from 'zod';

export const createNoticeSchema = z.object({
  title: z.string().trim().min(1).max(160),
  message: z.string().trim().min(1).max(3000).optional(),
  status: z.enum(RecordStatus).optional(),
});

export type CreateNoticeDto = z.infer<typeof createNoticeSchema>;
