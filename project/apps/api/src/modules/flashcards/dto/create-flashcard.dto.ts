import { RecordStatus } from 'generated/prisma/enums';
import { z } from 'zod';

export const createFlashcardSchema = z.object({
  front: z.string().trim().min(1).max(1000).describe('Frente'),
  back: z.string().trim().max(3000).optional().describe('Verso'),
  order: z.number().int().min(0).optional().describe('Ordem'),
  status: z.enum(RecordStatus).describe('Status'),
  topicId: z.uuid().describe('Topico'),
});

export type CreateFlashcardDto = z.infer<typeof createFlashcardSchema>;
