import { RecordStatus } from '../../../generated/prisma/enums';
import { z } from 'zod';

export const createTopicSchema = z.object({
  name: z.string().trim().min(1).max(140).describe('Nome'),
  description: z.string().trim().max(1000).optional().describe('Descricao'),
  order: z.number().int().min(0).optional().describe('Ordem'),
  status: z.enum(RecordStatus).optional().describe('Status'),
  subjectId: z.uuid().describe('Disciplina'),
});

export type CreateTopicDto = z.infer<typeof createTopicSchema>;
