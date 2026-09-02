import { RecordStatus } from '../../../generated/prisma/enums';
import { z } from 'zod';

export const createNoticeSchema = z.object({
  title: z.string().trim().min(1).max(160).describe('Titulo'),
  message: z.string().trim().min(1).max(3000).optional().describe('Mensagem'),
  status: z.enum(RecordStatus).optional().describe('Status'),
});

export type CreateNoticeDto = z.infer<typeof createNoticeSchema>;
