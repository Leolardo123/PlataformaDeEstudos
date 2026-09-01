import { z } from 'zod';
import { createTopicSchema } from './create-topic.dto';

export const updateTopicSchema = createTopicSchema.partial();

export type UpdateTopicDto = z.infer<typeof updateTopicSchema>;
