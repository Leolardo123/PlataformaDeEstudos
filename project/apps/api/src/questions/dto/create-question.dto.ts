import {
  Difficulty,
  QuestionType,
  RecordStatus,
} from '../../../generated/prisma/enums';
import { z } from 'zod';

export const questionAlternativeSchema = z.object({
  text: z.string().trim().min(1).max(1000),
  order: z.number().int().min(0).optional(),
  isCorrect: z.boolean().optional(),
});

export const createQuestionSchema = z.object({
  statement: z.string().trim().min(1).max(3000),
  type: z.enum(QuestionType).optional(),
  difficulty: z.enum(Difficulty).optional(),
  explanation: z.string().trim().max(3000).optional(),
  status: z.enum(RecordStatus).optional(),
  topicIds: z.array(z.uuid()).optional(),
  alternatives: z.array(questionAlternativeSchema).optional(),
});

export type CreateQuestionDto = z.infer<typeof createQuestionSchema>;
