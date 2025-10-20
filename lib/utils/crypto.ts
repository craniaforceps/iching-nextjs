import bcrypt from 'bcryptjs'

export async function hashPassword(password: string, saltRounds = 10) {
  return bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(plain: string, hash: string) {
  const valid = await bcrypt.compare(plain, hash)
  if (!valid) throw new Error('Password incorreta')
}
