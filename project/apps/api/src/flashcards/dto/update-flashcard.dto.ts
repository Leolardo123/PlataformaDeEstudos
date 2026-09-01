import { z } from 'zod';
import { createFlashcardSchema } from './create-flashcard.dto';

export const updateFlashcardSchema = createFlashcardSchema.partial();

export type UpdateFlashcardDto = z.infer<typeof updateFlashcardSchema>;
