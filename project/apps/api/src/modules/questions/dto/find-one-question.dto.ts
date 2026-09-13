import { z } from 'zod';

export const findOneQuestionSchema = z.object({
  id: z.uuid(),
});

export type FindOneQuestionDto = z.infer<typeof findOneQuestionSchema>;
