import { RecordStatus } from '../../../generated/prisma/enums';
import { z } from 'zod';

export const createTopicSchema = z.object({
	name: z.string().trim().min(1).max(140),
	description: z.string().trim().max(1000).optional(),
	order: z.number().int().min(0).optional(),
	status: z.enum(RecordStatus).optional(),
	subjectId: z.uuid(),
});

export type CreateTopicDto = z.infer<typeof createTopicSchema>;
