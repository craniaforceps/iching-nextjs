'use server'

import { cookies } from 'next/headers'
import { encrypt } from '@/lib/auth/session'
import { treeifyError } from 'zod'
import db from '@/data/db/db'
import bcrypt from 'bcryptjs'
import type { LoginState, User } from '@/lib/types/authTypes'
import { loginSchema } from '@/lib/schemas/authSchemas'

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const result = loginSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    const errorMap = treeifyError(result.error)
    return {
      errors: {
        email: errorMap?.properties?.email?.errors ?? [],
        password: errorMap?.properties?.password?.errors ?? [],
      },
    }
  }

  const { email, password } = result.data

  const user = db
    .prepare('SELECT id, email, password FROM users WHERE email = ?')
    .get(email) as User | undefined

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      errors: {
        email: ['Email ou palavra-passe inválidos'],
        password: [],
      },
    }
  }

  const session = await encrypt({ userId: user.id })
  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })

  // Em vez de redirect, retorna sucesso (ou um flag, se quiseres)
  return { errors: {}, success: true }
}
