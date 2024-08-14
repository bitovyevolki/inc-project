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
export type GoogleLoginArgs = {
  email: string
  token: string
}
export interface ErrorMessage {
  field: string
  message: string
}

export interface SignUpErrorResponse {
  error: string
  messages: ErrorMessage[]
  statusCode: number
}

export interface SignInArgs {
  email: string
  password: string
}

export interface SignInResponse {
  accessToken: string
}

export interface SignInResponseError {
  data: {
    error: string
    messages: string
    statusCode: number
  }
  status: number
}
