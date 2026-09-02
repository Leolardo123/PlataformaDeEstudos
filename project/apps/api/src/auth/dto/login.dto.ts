import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email().describe('Email'),
  password: z.string().min(4).max(128).describe('Senha'),
});

export type LoginDto = z.infer<typeof loginSchema>;
