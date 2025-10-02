import { NextRequest, NextResponse } from 'next/server'
import db from '@/data/db/db'
import { decrypt } from '@/lib/auth/session'
import { errorResponse, successResponse } from '@/lib/api/responses'

type UserRecord = {
  email: string
}

// POST /api/settings/contact - envia uma mensagem de contacto para a base de dados
export async function POST(req: NextRequest) {
  try {
    const { subject, message } = await req.json()

    if (!subject || !message) {
      return errorResponse('Preencha todos os campos', 400)
    }

    const cookie = req.cookies.get('session')?.value
    const tokenUser = cookie ? await decrypt(cookie) : null

    if (!tokenUser?.userId) {
      return errorResponse('Não autenticado', 401)
    }

    const userId = tokenUser.userId

    // Type assertion para corrigir o erro TS
    const userRecord = db
      .prepare('SELECT email FROM users WHERE id = ?')
      .get(userId) as UserRecord | undefined

    if (!userRecord?.email) {
      return errorResponse('Email do utilizador não encontrado', 404)
    }

    const email = userRecord.email

    db.prepare(
      'INSERT INTO contacts (user_id, email, subject, message) VALUES (?, ?, ?, ?)'
    ).run(userId, email, subject, message)

    return successResponse({ success: true })
  } catch (err) {
    console.error(err)
    return errorResponse((err as Error).message || 'Erro desconhecido', 500)
  }
}
