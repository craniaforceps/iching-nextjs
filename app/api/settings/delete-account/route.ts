import { NextRequest } from 'next/server'
import { decrypt } from '@/lib/auth/session'
import db from '@/data/db/db'
import { errorResponse, successResponse } from '@/lib/utils/responses'

export async function POST(req: NextRequest) {
  try {
    const cookie = req.cookies.get('session')?.value
    const user = await decrypt(cookie)

    if (!user?.userId) return errorResponse('Não autenticado', 401)

    const userId = user.userId

    // 🔹 Async run
    await db.run('DELETE FROM users WHERE id = ?', [userId])

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
