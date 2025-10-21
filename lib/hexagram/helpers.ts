import { binaryMatchSchema } from '@/lib/hexagram/hexagramSchemas'

// Função para validar o número do hexagrama (1-64)
export function validateNumber(param: number): number | null {
  const num = Number(param)
  if (isNaN(num) || num < 1 || num > 64) return null
  return num
}

// Função para validar o corpo da requisição para correspondência de hexagramas
export function validateBinaryMatch(body: {
  binary1: string
  binary2: string
}) {
  // Validar o corpo da requisição usando o Zod schema
  const result = binaryMatchSchema.safeParse(body)
  if (!result.success) {
    throw new Error(
      'Formato inválido: os binários devem consistir em 6 dígitos com valores 0 e 1'
    )
  }
  return result.data
}
