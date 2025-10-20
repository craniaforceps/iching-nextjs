import {
  getHexagramRowByBinary,
  getHexagramRowByNumber,
} from './hexagramRepository'
import { mapHexagramRow } from '@/lib/mappers/mapHexagramRow'
import { findMatchingHexagrams } from '@/lib/divinationMethods/coinMethodLogic/server'
import type { HexagramObject } from '@/lib/hexagram/hexagramTypes'

export function getHexagramByNumber(number: number): HexagramObject | null {
  const row = getHexagramRowByNumber(number)
  return row ? mapHexagramRow(row) : null
}

export function getHexagramByBinary(binary: string): HexagramObject | null {
  const row = getHexagramRowByBinary(binary)
  return row ? mapHexagramRow(row) : null
}

export async function getMatchingHexagrams(binaries: {
  binary1: string
  binary2: string
}) {
  const matches = await findMatchingHexagrams(binaries)
  if (!matches) throw new Error('Hexagramas não encontrados')
  return matches
}
