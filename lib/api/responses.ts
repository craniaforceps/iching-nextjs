import { SuccessResponse, ErrorResponse } from './../types/authTypes'
import { NextResponse } from 'next/server'

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json<SuccessResponse<T>>(
    { success: true, data },
    { status }
  )
}

export function errorResponse(error: string | object | unknown, status = 400) {
  return NextResponse.json<ErrorResponse>({ success: false, error }, { status })
}
