import { RecordStatus } from 'generated/prisma/enums';
import { z } from 'zod';

export const createFlashcardSchema = z.object({
  front: z.string().trim().min(1).max(1000),
  back: z.string().trim().max(3000).optional(),
  order: z.number().int().min(0).optional(),
  status: z.enum(RecordStatus),
  topicId: z.uuid(),
});

export type CreateFlashcardDto = z.infer<typeof createFlashcardSchema>;
