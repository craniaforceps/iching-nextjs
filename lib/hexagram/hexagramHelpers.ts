import { binaryMatchSchema } from '@/lib/hexagram/hexagramSchemas'

// Valida e converte o parâmetro de número do hexagrama
export function validateNumber(param: number): number | null {
  const num = Number(param)
  if (isNaN(num) || num < 1 || num > 64) return null
  return num
}

// Valida o corpo da requisição para correspondência de hexagramas binários
export function validateBinaryMatch(body: unknown) {
  const result = binaryMatchSchema.safeParse(body)
  if (!result.success) {
    throw new Error(
      'Formato inválido: os binários devem consistir em 6 dígitos com valores 0 e 1'
    )
  }
  return result.data
}
