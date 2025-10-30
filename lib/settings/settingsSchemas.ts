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

export const changeNameSchema = z.object({
  newName: z
    .string()
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .max(15, 'O nome deve ter no máximo 15 caracteres'),
  password: z.string().min(6, 'A password deve ter pelo menos 6 caracteres'),
})
