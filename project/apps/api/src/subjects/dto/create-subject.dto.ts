import { RecordStatus } from '../../../generated/prisma/enums';
import { z } from 'zod';

export const createSubjectSchema = z.object({
	name: z.string().trim().min(1).max(120),
	description: z.string().trim().max(1000).optional(),
	status: z.enum(RecordStatus).optional(),
});

export type CreateSubjectDto = z.infer<typeof createSubjectSchema>;
