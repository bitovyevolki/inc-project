export type SignUpArgs = {
  email: string
  password: string
  userName: string
}
export type ConfirmEmailArgs = {
  confirmationCode: string
}
export type SignUpResendEmailType = {
  email: string
}
export type SocialLoginType = {
  accessToken?: string
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
