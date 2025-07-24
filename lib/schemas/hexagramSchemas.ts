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
export const ReadingInputSchema = z.object({
  question: z.string().min(1, 'Pergunta obrigatória'),
  notes: z.string().nullable().optional(),

  originalHexagram: z.object({
    binary: z.string().regex(/^[01]{6}$/, 'Binary inválido (6 dígitos 0 ou 1)'),
  }),

  mutantHexagram: z.object({
    binary: z.string().regex(/^[01]{6}$/, 'Binary inválido (6 dígitos 0 ou 1)'),
  }),
})

export type ReadingInput = z.infer<typeof ReadingInputSchema>
