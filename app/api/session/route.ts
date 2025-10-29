import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/session'

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    return NextResponse.json(user ?? null)
  } catch (err) {
    console.error('Erro ao buscar usuário atual:', err)
    return NextResponse.json(null, { status: 500 })
  }
}
