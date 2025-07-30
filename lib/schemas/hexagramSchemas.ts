import { z } from 'zod'

// Binários
export const binaryMatchSchema = z.object({
  binary1: z.string().regex(/^[01]{6}$/, {
    message: 'binary1 deve ter exatamento 6 digitos 0 ou 1',
  }),
  binary2: z.string().regex(/^[01]{6}$/, {
    message: 'binary2 deve ter exatamento 6 dígitos 0 ou 1',
  }),
})

export type BinaryMatchInput = z.infer<typeof binaryMatchSchema>

// Inputs

// Esquema base comum aos dois casos
const BaseReadingSchema = z.object({
  question: z.string().min(1, 'Pergunta obrigatória'),
  notes: z.string().nullable().optional(),
  originalBinary: z.string().regex(/^[01]{6}$/, 'Binary inválido (6 dígitos)'),
  mutantBinary: z.string().regex(/^[01]{6}$/, 'Binary inválido (6 dígitos)'),
})

// Esquema para validar o input do cliente (ex: POST request)
export const ReadingInputSchema = BaseReadingSchema

export type ReadingInput = z.infer<typeof ReadingInputSchema>

// Esquema para validar o objeto completo a guardar, que inclui createdAt
export const SaveReadingSchema = BaseReadingSchema.extend({
  createdAt: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), 'Data inválida'),
})

// Caso notes deva ser só string ou undefined aqui, podes refinar
// se quiseres ser mais restritivo (opcional)
export const StrictSaveReadingSchema = SaveReadingSchema.refine(
  (data) => data.notes === null || typeof data.notes === 'string',
  {
    message: 'notes deve ser string ou null',
  }
)

export type SaveReadingInput = z.infer<typeof SaveReadingSchema>
