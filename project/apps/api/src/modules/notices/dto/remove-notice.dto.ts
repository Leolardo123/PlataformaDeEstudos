import { z } from 'zod';

export const removeNoticeSchema = z.object({
  id: z.uuid(),
});

export type RemoveNoticeDto = z.infer<typeof removeNoticeSchema>;
