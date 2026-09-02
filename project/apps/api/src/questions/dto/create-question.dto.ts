import {
  Difficulty,
  QuestionType,
  RecordStatus,
} from '../../../generated/prisma/enums';
import { z } from 'zod';

export const questionAlternativeSchema = z.object({
  text: z.string().trim().min(1).max(1000).describe('Texto da alternativa'),
  order: z.number().int().min(0).optional().describe('Ordem da alternativa'),
  isCorrect: z.boolean().optional().describe('Alternativa correta'),
});

export const createQuestionSchema = z.object({
  statement: z.string().trim().min(1).max(3000).describe('Enunciado'),
  type: z.enum(QuestionType).optional().describe('Tipo'),
  difficulty: z.enum(Difficulty).optional().describe('Dificuldade'),
  explanation: z.string().trim().max(3000).optional().describe('Explicacao'),
  status: z.enum(RecordStatus).optional().describe('Status'),
  topicIds: z.array(z.uuid()).optional().describe('Topicos'),
  alternatives: z
    .array(questionAlternativeSchema)
    .optional()
    .describe('Alternativas'),
});

export type CreateQuestionDto = z.infer<typeof createQuestionSchema>;
