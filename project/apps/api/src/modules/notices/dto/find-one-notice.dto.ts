import { z } from 'zod';

export const findOneNoticeSchema = z.object({
  id: z.uuid(),
});

export type FindOneNoticeDto = z.infer<typeof findOneNoticeSchema>;
