import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import db from '@/data/db/db'
import { registerSchema } from '@/lib/schemas/authSchemas'

const SALT_ROUNDS = 10

async function validateRequest(req: Request) {
  const body = await req.json()
  const parsed = registerSchema.safeParse(body)
  if (!parsed.success) {
    throw new Error(
      `Invalid request body: ${parsed.error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`
    )
  }
  return parsed.data
}

async function checkEmailExists(email: string) {
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
  if (existing) {
    throw new Error(`Este email já está registado: ${email}`)
  }
}

async function hashPassword(password: string) {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

export async function POST(request: Request) {
  try {
    // Recebe a requisição e valida se é um objeto com email e password (registerSchema)
    const { email, password } = await validateRequest(request)

    // Limpa o email e passwords de espaços vazios e afins
    const cleanEmail = email.trim().toLowerCase()
    const cleanPassword = password.trim()

    // Verificar se já existe um utilizador com este email
    await checkEmailExists(cleanEmail)

    // Hash da password
    const hashed = await hashPassword(cleanPassword)

    // Inserir novo utilizador na base de dados (email e password hashed)
    const result = db
      .prepare('INSERT INTO users (email, password) VALUES (?, ?)')
      .run(cleanEmail, hashed)

    return NextResponse.json({ success: true, id: result.lastInsertRowid })
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json(
        { error: `Erro ao processar o pedido ${err.message}` },
        { status: 500 }
      )
    }
  }
}
