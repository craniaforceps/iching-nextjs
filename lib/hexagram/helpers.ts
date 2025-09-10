import { binaryMatchSchema } from '@/lib/schemas/hexagramSchemas'

export function validateNumber(param: string): number | null {
  const num = Number(param)
  if (isNaN(num) || num < 1 || num > 64) return null
  return num
}

export function validateBinaryMatch(body: {
  binary1: string
  binary2: string
}) {
  const result = binaryMatchSchema.safeParse(body)
  if (!result.success) {
    throw new Error(
      'Formato inválido: os binários devem consistir em 6 dígitos com valores 0 e 1'
    )
  }
  return result.data
}
