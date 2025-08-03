import { z } from 'zod'

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  password: z.string(),
  createdAt: z.string(),
})

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(8, { message: 'Password deve ter pelo menos 8 caracteres' })
    .trim(),
})

export const registerSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(6, { message: 'A palavra-passe deve ter no mínimo 6 caracteres' }),
})
