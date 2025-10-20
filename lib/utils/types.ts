export type ErrorResponse = {
  success: false
  error: string | object | unknown
}

export type SuccessResponse<T> = {
  success: true
  data: T
}
