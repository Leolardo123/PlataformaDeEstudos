import { z } from 'zod';

export const findOneTopicSchema = z.object({
  topicId: z.uuid(),
});

export type FindOneTopicDto = z.infer<typeof findOneTopicSchema>;
