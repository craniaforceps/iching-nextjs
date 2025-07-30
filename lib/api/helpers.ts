import { randomUUID } from 'crypto'
import type { Reading } from '@/lib/types/hexagram'

import { NextRequest } from 'next/server'

export function extractIdFromRequest(request: NextRequest): string | null {
  const url = new URL(request.url) // cria uma instância URL da requisição
  const segments = url.pathname.split('/') // separa a URL em partes pelo '/'
  return segments.at(-1) ?? null // pega o último segmento (id) ou null se não existir
}

export function ensureReadingsHaveIds(readings: Reading[]): Reading[] {
  let updated = false
  const newList = readings.map((reading) => {
    if (!reading.id) {
      updated = true
      return { ...reading, id: randomUUID() }
    }
    return reading
  })
  return updated ? newList : readings
}
