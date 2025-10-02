import { successResponse, errorResponse } from '@/lib/api/responses'
import { loginUser } from '@/lib/auth/actions'
import type { LoginState } from '@/lib/types/authTypes'

// POST /api/auth/login - Valida e autentica utilizador
export async function POST(req: Request) {
  try {
    // 1. Lê os dados do request do frontend através do formData
    const formData = await req.formData()
    const initialState: LoginState = {
      errors: { email: [], password: [] },
      success: false,
    }

    // 2. Valida e autentica utilizador - o loginUser trata do JWT
    const result = await loginUser(initialState, formData)

    // 3. Se falhar, retorna erros. Se sucesso, retorna ID do utilizador
    if (!result.success) {
      return errorResponse({ errors: result.errors }, 401)
    }

    return successResponse({ id: result.userId }, 200)
  } catch (err: unknown) {
    console.error(err)
    return errorResponse((err as Error)?.message || 'Invalid request', 400)
  }
}
