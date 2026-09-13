import { z } from 'zod';

export const findOneSubjectSchema = z.object({
  id: z.uuid(),
});

export type FindOneSubjectDto = z.infer<typeof findOneSubjectSchema>;
