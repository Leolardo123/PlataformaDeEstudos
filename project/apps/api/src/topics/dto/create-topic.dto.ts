import { RecordStatus } from '../../../generated/prisma/enums';
import { z } from 'zod';

export const createTopicSchema = z.object({
  name: z.string().trim().min(1).max(140).describe('Nome'),
  description: z.string().trim().max(1000).optional().describe('Descricao'),
  contentRichText: z
    .string()
    .trim()
    .max(50000)
    .optional()
    .describe('Conteudo em rich-text'),
  contentPdfUrls: z.array(z.string().url()).optional().describe('Anexos PDF'),
  contentVideoUrls: z
    .array(z.string().url())
    .optional()
    .describe('Videos do topico'),
  contentLinkUrls: z
    .array(z.string().url())
    .optional()
    .describe('Links gerais do topico'),
  order: z.number().int().min(0).optional().describe('Ordem'),
  status: z.enum(RecordStatus).optional().describe('Status'),
  subjectId: z.uuid().describe('Disciplina'),
});

export type CreateTopicDto = z.infer<typeof createTopicSchema>;
