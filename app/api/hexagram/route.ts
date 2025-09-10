import { validateBinaryMatch } from '@/lib/hexagram/helpers'
import { getMatchingHexagrams } from '@/lib/hexagram/getMatchingHexagrams'
import { successResponse, errorResponse } from '@/lib/api/responses'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const binaries = validateBinaryMatch(body)
    const matches = await getMatchingHexagrams(binaries)

    return successResponse(
      {
        match1: matches.match1,
        match2: matches.match2,
      },
      200
    )
  } catch (err) {
    return errorResponse(err, 500)
  }
}
