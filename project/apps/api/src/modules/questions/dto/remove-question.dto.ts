import { z } from 'zod';

export const removeQuestionSchema = z.object({
  id: z.uuid(),
});

export type RemoveQuestionDto = z.infer<typeof removeQuestionSchema>;
