import { z } from 'zod';

export const findAllTopicsSchema = z.object({
  subjectId: z.uuid().optional(),
  noticeId: z.uuid().optional(),
});

export type FindAllTopicsDto = z.infer<typeof findAllTopicsSchema>;
