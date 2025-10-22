import bcrypt from 'bcryptjs'
import { ZodType } from 'zod'
import { getUserById } from './settingsRepository'

// Função validate genérica
export function validate<T>(schema: ZodType<T>, data: unknown): T {
  if (!schema) {
    console.error('Schema está undefined!')
    throw new Error('Schema inválido')
  }

  const result = schema.safeParse(data)
  if (!result.success) {
    const messages = result.error.issues.map((issue) => issue.message)
    throw new Error(messages.join('\n'))
  }
  return result.data
}

// Função auxiliar para obter o utilizador ou lançar erro
export async function getUserOrFail(userId: number) {
  const user = await getUserById(userId)
  if (!user) throw new Error('Utilizador não encontrado')
  return user
}

// Funções de auth
export async function verifyPassword(plain: string, hash: string) {
  const valid = await bcrypt.compare(plain, hash)
  if (!valid) throw new Error('Password incorreta')
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10)
}
