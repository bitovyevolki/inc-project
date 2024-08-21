import {
  ConfirmEmailArgs,
  CreateNewPasswordArgs,
  GoogleLoginArgs,
  GoogleLoginResponse,
  MeResponse,
  RecoverPasswordCodeArgs,
  SendResetPasswordArgs,
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
      checkPasswordRecoveryCode: builder.query<void, RecoverPasswordCodeArgs>({
        query: queryArgs => {
          return {
            body: queryArgs,
            method: 'POST',
            url: '/v1/auth/check-recovery-code',
          }
        },
      }),
      confirmEmail: builder.query<void, ConfirmEmailArgs>({
        query: data => ({
          body: { ...data },
          method: 'POST',
          url: '/v1/auth/registration-confirmation',
        }),
      }),
      createNewPassword: builder.mutation<void, CreateNewPasswordArgs>({
        query: queryArgs => {
          return {
            body: queryArgs,
            method: 'POST',
            url: '/v1/auth/new-password',
          }
        },
      }),
      googleLogin: builder.mutation<GoogleLoginResponse, GoogleLoginArgs>({
        async onQueryStarted(_, { queryFulfilled }) {
          const { data } = await queryFulfilled

          if (data.accessToken) {
            localStorage.setItem('token', data.accessToken)
          }
        },
        query: data => ({
          body: { ...data },
          method: 'POST',
          url: '/v1/auth/google/login',
        }),
      }),
      logOut: builder.query<void, void>({
        query: () => ({
          body: { baseUrl: 'http://localhost:3000' },
          method: 'POST',
          url: `/v1/auth/logout`,
        }),
      }),
      me: builder.query<MeResponse, void>({
        providesTags: ['Me'],
        query: () => '/v1/auth/me',
      }),
      resendEmail: builder.mutation<void, SignUpResendEmailType>({
        query: data => ({
          body: { ...data, baseUrl: process.env.NEXT_PUBLIC_BASE_URL },
          method: 'POST',
          url: '/v1/auth/registration-email-resending',
        }),
      }),
      sendResetPasswordEmail: builder.mutation<void, SendResetPasswordArgs>({
        query: queryArgs => ({
          body: { baseUrl: 'http://localhost:3000', ...queryArgs },
          method: 'POST',
          url: '/v1/auth/password-recovery',
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
  useCheckPasswordRecoveryCodeQuery,
  useConfirmEmailQuery,
  useCreateNewPasswordMutation,
  useGoogleLoginMutation,
  useLazyLogOutQuery,
  useMeQuery,
  useResendEmailMutation,
  useSendResetPasswordEmailMutation,
  useSignInMutation,
  useSignUpMutation,
} = AuthService
