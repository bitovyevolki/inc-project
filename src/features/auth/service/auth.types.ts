export type SignUpArgs = {
  email: string
  password: string
  userName: string
}
export interface ErrorMessage {
  field: string
  message: string
}

export interface SignUpResponse {
  error: string
  messages: ErrorMessage[]
  statusCode: number
}
