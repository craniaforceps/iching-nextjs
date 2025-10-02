import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/auth/session'
import db from '@/data/db/db'
import bcrypt from 'bcrypt'

// POST /api/settings/change-email - altera o email do utilizador
export async function POST(req: NextRequest) {
  try {
    // Lê cookie de sessão
    const cookie = req.cookies.get('session')?.value
    const user = await decrypt(cookie)

    if (!user?.userId) {
      return NextResponse.json(
        { success: false, error: 'Não autenticado' },
        { status: 401 }
      )
    }

    const { newEmail, password } = await req.json()

    if (!newEmail || !password) {
      return NextResponse.json(
        { success: false, error: 'Campos em falta' },
        { status: 400 }
      )
    }

    // Vai buscar utilizador
    type DBUser = { id: string; email: string; password: string }
    const dbUser = db
      .prepare('SELECT id, email, password FROM users WHERE id = ?')
      .get(user.userId) as DBUser | undefined

    if (!dbUser) {
      return NextResponse.json(
        { success: false, error: 'Utilizador não encontrado' },
        { status: 404 }
      )
    }

    // Verifica password
    const valid = await bcrypt.compare(password, dbUser.password)
    if (!valid) {
      return NextResponse.json(
        { success: false, error: 'Password incorreta' },
        { status: 401 }
      )
    }

    // Atualiza email
    db.prepare('UPDATE users SET email = ? WHERE id = ?').run(
      newEmail,
      user.userId
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    )
  }
}
