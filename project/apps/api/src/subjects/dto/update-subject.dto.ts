import { z } from 'zod';
import { createSubjectSchema } from './create-subject.dto';

export const updateSubjectSchema = createSubjectSchema.partial();

export type UpdateSubjectDto = z.infer<typeof updateSubjectSchema>;
