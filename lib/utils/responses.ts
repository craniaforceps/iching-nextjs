import { SuccessResponse, ErrorResponse } from '@/lib/utils/types'
import { NextResponse } from 'next/server'

// Função para criar uma resposta de sucesso
export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json<SuccessResponse<T>>(
    { success: true, data },
    { status }
  )
}

// Função para criar uma resposta de erro
export function errorResponse(error: string | object | unknown, status = 400) {
  return NextResponse.json<ErrorResponse>({ success: false, error }, { status })
}
