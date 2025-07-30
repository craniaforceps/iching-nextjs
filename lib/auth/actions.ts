'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { encrypt } from '@/lib/auth/session' // Assumindo que usas jose
import { z, treeifyError } from 'zod'
import db from '@/data/db/db'
import bcrypt from 'bcryptjs'
import type { User } from '@/lib/types/hexagram'

const loginSchema = z.object({
  email: z.email(),
  password: z
    .email()
    .min(8, { message: 'Password deve ter pelo menos 8 caracteres' })
    .trim(),
})

type LoginState = {
  errors?: {
    email?: string[]
    password?: string[]
  }
}

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState | void> {
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
      },
    }
  }

  // ✅ Encriptar e guardar cookie diretamente
  const session = await encrypt({ userId: user.id })

  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'lax',
  })

  redirect('/dashboard')
}
