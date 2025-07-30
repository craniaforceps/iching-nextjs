// Zod
import { binaryMatchSchema } from '@/lib/schemas/hexagramSchemas'

// Helper
import { findMatchingHexagrams } from '@/lib/divinationMethods/coinMethodLogic/server'

// Next
import { NextResponse } from 'next/server'

// POST method
export async function POST(req: Request) {
  try {
    // Recebe os dados da requisição
    const body = await req.json()

    // Validação de dados através do zod
    const result = binaryMatchSchema.safeParse(body)

    // Tratamento de erro - binary inválidos
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Formato inválido: os binários devem consistir em 6 digitos com valores 0 e 1',
        },
        { status: 400 }
      )
    }

    // O binaries será o resultado da validação (contém as props binary1 e binary2)
    const binaries = result.data
    const matches = await findMatchingHexagrams(binaries)

    // Tratamento do erro - match não existe
    if (!matches) {
      return NextResponse.json(
        { success: false, error: 'Hexagrama não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      match1: matches.match1,
      match2: matches.match2,
    })
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Erro desconhecido'
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}
