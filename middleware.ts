// app/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/auth/session'

const protectedRoutes = ['/dashboard', '/historico']
const publicRoutes = ['/login', '/register']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const token = req.cookies.get('session')?.value
  const payload = token ? await decrypt(token) : null

  const userId = payload?.userId

  // Rota protegida sem sessão → login
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // Rota pública com sessão → dashboard
  if (publicRoutes.some((route) => pathname.startsWith(route)) && userId) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
  runtime: 'nodejs',
}
