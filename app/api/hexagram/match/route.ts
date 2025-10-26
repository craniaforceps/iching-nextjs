// app/api/hexagram/match/route.ts
export const runtime = 'nodejs'

import { validateBinaryMatch } from '@/lib/hexagram/helpers'
import { getMatchingHexagrams } from '@/lib/hexagram/hexagramServices'
import { successResponse, errorResponse } from '@/lib/utils/responses'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validar binários
    const binaries = validateBinaryMatch(body) // deve retornar { binary1, binary2 }

    // Buscar hexagramas correspondentes
    const matches = await getMatchingHexagrams(binaries)

    return successResponse(
      { match1: matches.match1, match2: matches.match2 },
      200
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('Erro no POST /hexagram/match:', message)
    return errorResponse({ error: message }, 500)
  }
}
