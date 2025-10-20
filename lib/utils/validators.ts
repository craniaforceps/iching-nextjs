import { ZodType } from 'zod'

export function validate<T>(schema: ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    const messages = result.error.issues.map((issue) => issue.message)
    throw new Error(messages.join('\n'))
  }
  return result.data
}
