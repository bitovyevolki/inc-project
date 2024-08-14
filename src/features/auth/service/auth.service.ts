import {
  ConfirmEmailArgs,
  GoogleLoginArgs,
  SignInArgs,
  SignInResponse,
  SignUpArgs,
  SignUpResendEmailType,
} from '@/src/features/auth/service/auth.types'
import { inctagramService } from '@/src/shared/model/inctagram.service'

export const AuthService = inctagramService.injectEndpoints({
  /// ADD Your Endpoints
  endpoints: builder => {
    return {
      confirmEmail: builder.query<void, ConfirmEmailArgs>({
        query: data => ({
          body: { ...data },
          method: 'POST',
          url: `/v1/auth/registration-confirmation`,
        }),
      }),
      googleLogin: builder.mutation<void, GoogleLoginArgs>({
        query: data => ({
          body: { ...data },
          method: 'POST',
          url: '/auth/google/login',
        }),
      }),
      resendEmail: builder.mutation<void, SignUpResendEmailType>({
        query: data => ({
          body: { ...data, baseUrl: process.env.NEXT_PUBLIC_BASE_URL },
          method: 'POST',
          url: `/v1/auth/registration-email-resending`,
        }),
      }),
      signIn: builder.mutation<SignInResponse, SignInArgs>({
        async onQueryStarted(_, { queryFulfilled }) {
          const { data } = await queryFulfilled

          if (data.accessToken) {
            localStorage.setItem('token', data.accessToken)
          }
        },
        query(data) {
          return {
            body: data,
            method: 'POST',
            url: '/v1/auth/login',
          }
        },
      }),
      signUp: builder.mutation<void, SignUpArgs>({
        query(data) {
          return {
            body: { ...data, baseUrl: process.env.NEXT_PUBLIC_BASE_URL },
            method: 'POST',
            url: '/v1/auth/registration',
          }
        },
      }),
    }
  },
})
export const {
  useConfirmEmailQuery,
  useGoogleLoginMutation,
  useResendEmailMutation,
  useSignInMutation,
  useSignUpMutation,
} = AuthService
