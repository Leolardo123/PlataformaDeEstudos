import { z } from 'zod';

export const removeSubjectSchema = z.object({
  id: z.uuid(),
});

export type RemoveSubjectDto = z.infer<typeof removeSubjectSchema>;
