import { ReadingRow, ReadingView } from '@/lib/readings/readingsTypes'
import { getHexagramByBinary } from '@/lib/hexagram/hexagramServices'
import { ReadingInputSchema } from '@/lib/hexagram/hexagramSchemas'

// Validação de input da leitura
export function validateReadingInput(payload: unknown) {
  const parsed = ReadingInputSchema.safeParse(payload)
  if (!parsed.success)
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '))
  return parsed.data
}

// Mapper síncrono (mantido se precisares em algum lado)
export function mapRowToView(row: ReadingRow): ReadingView {
  const originalHex = getHexagramByBinary(row.originalBinary)
  const mutantHex = getHexagramByBinary(row.mutantBinary)

  console.log('Mapping Row to View', { originalHex, mutantHex }) // 🔹 DEBUG
  return {
    ...row,
    // ⚠️ Isso vai devolver apenas promessas não resolvidas se getHexagramByBinary for async
    originalHexagram: row.originalBinary as any,
    mutantHexagram: row.mutantBinary as any,
  }
}

// ⚡ Mapper async - devolve hexagramas completos
export async function mapRowToViewAsync(row: ReadingRow): Promise<ReadingView> {
  const original = await getHexagramByBinary(row.originalBinary)
  const mutant = await getHexagramByBinary(row.mutantBinary)

  return {
    ...row,
    originalHexagram: original!,
    mutantHexagram: mutant!,
  }
}
