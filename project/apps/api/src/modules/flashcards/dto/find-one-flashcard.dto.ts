import { z } from 'zod';

export const findOneFlashcardSchema = z.object({
  id: z.string().uuid(),
});

export type FindOneFlashcardDto = z.infer<typeof findOneFlashcardSchema>;
