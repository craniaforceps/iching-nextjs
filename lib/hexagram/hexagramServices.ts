import {
  getHexagramRowByNumber,
  getHexagramRowByBinary,
} from './hexagramRepository'
import { mapHexagramRow } from '@/lib/mappers/mapHexagramRow'
import { findMatchingHexagrams } from '@/lib/divinationMethods/coinMethodLogic/server'
import type { HexagramObject } from './hexagramTypes'

export async function getHexagramByNumber(
  number: number
): Promise<HexagramObject | null> {
  const row = await getHexagramRowByNumber(number)
  return row ? mapHexagramRow(row) : null
}

export async function getHexagramByBinary(
  binary: string
): Promise<HexagramObject | null> {
  const row = await getHexagramRowByBinary(binary)
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
