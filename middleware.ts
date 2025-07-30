import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/auth/session' // tua função para verificar o token JWT

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/register']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const cookie = req.cookies.get('session')?.value
  const session = cookie ? await decrypt(cookie) : null

  // Se a rota é protegida e não tem sessão, redireciona para login
  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !session?.userId
  ) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // Se a rota é pública e tem sessão, redireciona para dashboard
  if (
    publicRoutes.some((route) => pathname.startsWith(route)) &&
    session?.userId
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

// Aplica middleware só a estas rotas (opcional)
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}
