import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { loadReadings, saveReadings } from '@/lib/api/readings'
import { ensureReadingsHaveIds } from '@/lib/api/helpers'
import type { Reading } from '@/types/hexagram'

/* GET /api/readings
 * Lê todas as leituras do ficheiro JSON.
 * Se alguma leitura não tiver 'id', gera um novo UUID e grava o ficheiro atualizado.
 * Retorna a lista completa das leituras.
 */
export async function GET() {
  const list: Reading[] = loadReadings()
  const listWithIds = ensureReadingsHaveIds(list)
  if (listWithIds !== list) saveReadings(listWithIds)
  return NextResponse.json(listWithIds)
}

/* POST /api/readings
 * Recebe uma nova leitura via corpo da requisição.
 * Atribui um 'id' único e timestamp 'createdAt' antes de guardar.
 * Adiciona a leitura à lista e grava no ficheiro JSON.
 * Retorna sucesso e a leitura criada.
 */
export async function POST(req: Request) {
  try {
    // Obtém os dados enviados na requisição
    const data: Omit<Reading, 'id' | 'createdAt'> = await req.json()

    // Cria uma nova leitura com id e data
    const newReading: Reading = {
      ...data,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    }

    // Carrega lista atual, adiciona a nova leitura e salva
    const list: Reading[] = loadReadings()
    list.push(newReading)
    saveReadings(list)

    // Retorna sucesso com a leitura criada
    return NextResponse.json({ success: true, reading: newReading })
  } catch (err: unknown) {
    // Caso ocorra erro, retorna mensagem e status 500
    const error = err instanceof Error ? err.message : 'Erro desconhecido'
    return NextResponse.json({ error }, { status: 500 })
  }
}
