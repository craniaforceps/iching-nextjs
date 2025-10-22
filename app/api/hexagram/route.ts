export const runtime = 'nodejs'

import { validateBinaryMatch } from '@/lib/hexagram/helpers'
import { getMatchingHexagrams } from '@/lib/hexagram/hexagramServices'
import { successResponse, errorResponse } from '@/lib/utils/responses'

// POST /api/hexagram/match
// Este endpoint recebe um corpo JSON com dois arrays de binários (6 valores entre 0 e 1) representando dois conjuntos de linhas de hexagramas.
// Retorna os hexagramas correspondentes aos dois conjuntos fornecidos.
export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validar o corpo da requisição
    const binaries = validateBinaryMatch(body)

    // Obter os hexagramas correspondentes aos binários fornecidos
    const matches = await getMatchingHexagrams(binaries)

    return successResponse(
      {
        match1: matches.match1,
        match2: matches.match2,
      },
      200
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('Erro no POST /hexagram/match:', message)
    return errorResponse({ error: message }, 500)
  }
}
