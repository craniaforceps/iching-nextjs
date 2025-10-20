// validators.ts
import { registerSchema } from '@/lib/auth/authSchemas'

export function validateRegister(data: unknown) {
  const result = registerSchema.safeParse(data)
  if (!result.success) throw result.error
  return result.data
}
