import { NextResponse, NextRequest } from 'next/server'

const COOKIE_NAME = 'session'

export async function POST(request: NextRequest) {
  if (request.cookies.get(COOKIE_NAME)?.value) {
    const response = NextResponse.json({ success: true })
    response.cookies.delete(COOKIE_NAME)
    return response
  }
  return NextResponse.json({ error: 'Cookie not found' }, { status: 404 })
}
