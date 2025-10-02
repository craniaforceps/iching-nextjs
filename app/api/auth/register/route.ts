import { registerUser } from '@/lib/auth/actions'
import { setSecurityHeaders } from '@/lib/api/securityHeaders'
import { successResponse, errorResponse } from '@/lib/api/responses'
import { encrypt, setSessionCookie } from '@/lib/auth/session'

// POST /api/auth/register - Regista novo utilizador
export async function POST(req: Request) {
  try {
    const body = await req.json()

    // 1. Cria usuário na base de dados
    const result = await registerUser(body)

    // 2. Gera token JWT para login automático
    const token = await encrypt({ userId: Number(result.id) })

    // 3. Cria a resposta com success
    const response = successResponse({ id: result.id }, 201)

    // 4. Define o cookie de sessão
    setSessionCookie(response, token)

    // 5. Define headers de segurança
    setSecurityHeaders(response)

    return response
  } catch (err: unknown) {
    console.error(err)
    const message = err instanceof Error ? err.message : 'Erro desconhecido'
    return errorResponse(message, 400)
  }
}
