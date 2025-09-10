import { successResponse, errorResponse } from '@/lib/api/responses'
import { setSecurityHeaders } from '@/lib/api/securityHeaders'
import { loginUser } from '@/lib/auth/actions'
import { encrypt, setSessionCookie } from '@/lib/auth/session'
import type { LoginState } from '@/lib/types/authTypes'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    // Estado inicial compatível com LoginState
    const initialState: LoginState = {
      errors: { email: [], password: [] },
      success: false,
    }

    // Chama a ação de login
    const result = await loginUser(initialState, formData)

    if (!result.success) {
      return errorResponse({ errors: result.errors }, 401)
    }

    // Pega o userId retornado pelo loginUser
    const userId = result.userId
    if (!userId) {
      return errorResponse('User ID not found', 500)
    }

    // Gera token JWT
    const token = await encrypt({ userId })

    // Cria a resposta com cookie de sessão
    const response = successResponse({ id: userId }, 200)
    setSessionCookie(response, token)
    setSecurityHeaders(response)

    return response
  } catch (err: unknown) {
    console.error(err)
    return errorResponse((err as Error)?.message || 'Invalid request', 400)
  }
}
