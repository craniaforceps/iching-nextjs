import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import type { Reading } from '@/lib/types/hexagram'

// Caminho absoluto para o ficheiro JSON que guarda as leituras
const FILE = path.join(process.cwd(), 'data', 'hexagrams.json')

/**
 * Lê as leituras salvas no disco.
 * - Se o ficheiro não existir, devolve um array vazio.
 * - Se alguma leitura não tiver `id`, é gerado um automaticamente.
 * - Se algum `id` for adicionado, o ficheiro é regravado com os dados atualizados.
 */
export function loadReadings(): Reading[] {
  if (!fs.existsSync(FILE)) {
    return []
  }

  const raw = fs.readFileSync(FILE, 'utf-8').trim()
  const list: Reading[] = raw.length > 0 ? (JSON.parse(raw) as Reading[]) : []

  console.log(`[loadReadings] ${list.length} leitura(s) carregada(s).`)

  let updated = false

  for (const reading of list) {
    if (!reading.id) {
      reading.id = randomUUID()
      updated = true
    }
  }

  if (updated) {
    saveReadings(list)
  }

  return list
}

/**
 * Guarda a lista de leituras no disco em formato JSON, com indentação para facilitar a leitura.
 */
export function saveReadings(list: Reading[]) {
  fs.writeFileSync(FILE, JSON.stringify(list, null, 2))
  // console.log('[saveReadings] Leituras salvas com sucesso.')
}
