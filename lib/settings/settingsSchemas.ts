import { z } from 'zod'

export const emailSchema = z.string().email({ message: 'Email inválido' })

export const passwordSchema = z
  .string()
  .min(6, { message: 'Password deve ter pelo menos 6 caracteres' })

export const contactSchema = z.object({
  subject: z.string().min(1, 'Assunto é obrigatório'),
  message: z.string().min(1, 'Mensagem é obrigatória'),
})

export const nameSchema = z
  .string()
  .min(1, { message: 'Nome não pode ser vazio' })
  .max(100, { message: 'Nome demasiado longo' })
