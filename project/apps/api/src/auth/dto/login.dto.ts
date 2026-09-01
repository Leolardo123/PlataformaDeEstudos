import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(4).max(128),
});

export type LoginDto = z.infer<typeof loginSchema>;
