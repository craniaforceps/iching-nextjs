import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/auth/session'
import db from '@/data/db/db'
import bcrypt from 'bcrypt'
import { errorResponse, successResponse } from '@/lib/api/responses'

// POST /api/settings/change-password - altera a password do utilizador
// TODO: Mudar Next.Response para successResponse e errorResponse
export async function POST(req: NextRequest) {
  try {
    // Lê cookie de sessão
    const cookie = req.cookies.get('session')?.value
    const user = await decrypt(cookie)

    if (!user?.userId) {
      return errorResponse('Não autenticado', 401)
    }

    const { currentPassword, newPassword } = await req.json()

    if (!currentPassword || !newPassword) {
      return errorResponse('Campos em falta', 400)
    }

    // Vai buscar utilizador (tipado corretamente)
    type DBUser = { id: string; email: string; password: string }
    const dbUser = db
      .prepare('SELECT id, email, password FROM users WHERE id = ?')
      .get(user.userId) as DBUser | undefined

    if (!dbUser) {
      return errorResponse('Utilizador não encontrado', 404)
    }

    // Verifica password atual
    const valid = await bcrypt.compare(currentPassword, dbUser.password)
    if (!valid) {
      return errorResponse('Password atual incorreta', 401)
      {
        status: 401
      }
    }

    // Gera hash da nova password
    const newHash = await bcrypt.hash(newPassword, 10)

    // Atualiza password no DB
    db.prepare('UPDATE users SET password = ? WHERE id = ?').run(
      newHash,
      user.userId
    )

    return successResponse({ success: true })
  } catch (err) {
    console.error(err)
    return errorResponse((err as Error).message, 500)
  }
}
