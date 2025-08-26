import { binaryMatchSchema } from '@/lib/schemas/hexagramSchemas'
import { findMatchingHexagrams } from '@/lib/divinationMethods/coinMethodLogic/server'
import { NextResponse } from 'next/server'

// !!! mudar o type de unknown para o tipo correto do binary match
export function validateBinaryMatch(body: {
  binary1: string
  binary2: string
}): { binary1: string; binary2: string } {
  const result = binaryMatchSchema.safeParse(body)
  if (!result.success) {
    throw new Error(
      'Formato inválido: os binários devem consistir em 6 digitos com valores 0 e 1'
    )
  }
  return result.data
}

export async function getMatchingHexagrams(binaries: {
  binary1: string
  binary2: string
}) {
  const matches = await findMatchingHexagrams(binaries)
  if (!matches) {
    throw new Error('Hexagrama não encontrado')
  }
  return matches
}

export function handleError(err: unknown) {
  const error = err instanceof Error ? err.message : 'Erro desconhecido'
  return NextResponse.json({ success: false, error }, { status: 500 })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const binaries = validateBinaryMatch(body)
    const matches = await getMatchingHexagrams(binaries)

    return NextResponse.json({
      success: true,
      match1: matches.match1,
      match2: matches.match2,
    })
  } catch (err) {
    return handleError(err)
  }
}
