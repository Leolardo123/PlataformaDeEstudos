import { Role } from 'generated/prisma/enums';
import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1).describe('Nome'),
  email: z.email().describe('Email'),
  password: z.string().min(6).describe('Senha'),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;

export const validateUserEmailSchema = z.object({
  token: z.string().min(1).describe('Token'),
});

export type ValidateUserEmailDto = z.infer<typeof validateUserEmailSchema>;

export const resendValidateUserEmailSchema = z.object({
  email: z.email().describe('Email'),
  role: z.enum(Object.values(Role)).describe('Tipo de usuário'),
});

export type ResendValidateUserEmailDto = z.infer<
  typeof resendValidateUserEmailSchema
>;
