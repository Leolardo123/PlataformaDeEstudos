import { z } from 'zod';
import { createQuestionSchema } from './create-question.dto';

export const updateQuestionSchema = createQuestionSchema.partial();

export type UpdateQuestionDto = z.infer<typeof updateQuestionSchema>;
