export const runtime = 'nodejs'

import { successResponse } from '@/lib/utils/responses'
import { setSecurityHeaders } from '@/lib/utils/security'
import { setSession } from '@/lib/auth/session'

// POST /api/auth/logout
// O logout é a única acção em que foram usados endpoints. Em login e registo usa-se  "server actions" para testar uma abordagem tendo em conta as ferramentas que o Next.js oferece.

export async function POST() {
  // Remove a sessão do lado do servidor
  await setSession('')

  const response = successResponse({ success: true }, 200)
  setSecurityHeaders(response)
  return response
}
