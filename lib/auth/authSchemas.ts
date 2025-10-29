import { z } from 'zod'

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
  createdAt: z.string(),
})

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(6, { message: 'A palavra-passe deve ter pelo menos 6 caracteres' })
    .trim(),
})

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .max(20, 'O nome deve ter no máximo 20 caracteres'),
  email: z
    .string()
    .email({ message: 'O email não é válido' })
    .transform((e) => e.toLowerCase()),
  password: z
    .string()
    .min(6, { message: 'A palavra-passe deve ter pelo menos 6 caracteres' }),
})
