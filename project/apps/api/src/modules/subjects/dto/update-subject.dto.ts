import { z } from 'zod';
import { createSubjectSchema } from './create-subject.dto';

export const updateSubjectSchema = createSubjectSchema.partial().extend({
  id: z.uuid(),
});

export type UpdateSubjectDto = z.infer<typeof updateSubjectSchema>;
