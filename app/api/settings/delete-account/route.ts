// app/api/settings/delete-account/route.ts
import { NextRequest } from 'next/server'
import { decrypt } from '@/lib/auth/session'
import db from '@/data/db/db'
import { errorResponse, successResponse } from '@/lib/api/responses'

// DELETE /api/settings/delete-account - apaga a conta do utilizador (e dados associados via ON DELETE CASCADE)
export async function POST(req: NextRequest) {
  try {
    // 1️⃣ Lê cookie de sessão
    const cookie = req.cookies.get('session')?.value
    const user = await decrypt(cookie)

    if (!user?.userId) {
      return errorResponse('Não autenticado', 401)
    }

    const userId = user.userId

    // 2️⃣ Apaga utilizador → cascade apaga readings, readings_old, contacts automaticamente
    db.prepare('DELETE FROM users WHERE id = ?').run(userId)

    // 3️⃣ Remove cookie
    const res = successResponse({ success: true })
    res.cookies.set({
      name: 'session',
      value: '',
      maxAge: 0,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
    })

    return res
  } catch (err) {
    console.error(err)
    return errorResponse((err as Error).message, 500)
  }
}
