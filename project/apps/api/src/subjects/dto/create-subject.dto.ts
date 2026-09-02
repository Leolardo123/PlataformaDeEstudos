import { RecordStatus } from '../../../generated/prisma/enums';
import { z } from 'zod';

export const createSubjectSchema = z.object({
	name: z.string().trim().min(1).max(120).describe('Nome'),
	description: z.string().trim().max(1000).optional().describe('Descricao'),
	status: z.enum(RecordStatus).optional().describe('Status'),
});

export type CreateSubjectDto = z.infer<typeof createSubjectSchema>;
