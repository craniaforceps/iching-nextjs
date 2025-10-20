import { ReadingInputSchema } from '@/lib/hexagram/hexagramSchemas'
import { getHexagramByBinary } from '@/lib/hexagram/hexagramServices'
import type {
  ReadingRow,
  ReadingView,
  ReadingInput,
} from '@/lib/readings/readingsTypes'

export function validateReadingInput(payload: unknown): ReadingInput {
  const parsed = ReadingInputSchema.safeParse(payload)
  if (!parsed.success)
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '))
  return parsed.data
}

export function mapRowToView(row: ReadingRow): ReadingView {
  return {
    ...row,
    originalHexagram: getHexagramByBinary(row.originalBinary)!,
    mutantHexagram: getHexagramByBinary(row.mutantBinary)!,
  }
}
