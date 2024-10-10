import { toast } from 'react-toastify'

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
import Router from 'next/router'

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
      logOut: builder.mutation<void, void>({
        onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
          try {
            await queryFulfilled
            localStorage.removeItem('token')
            //TODO should here be local api or baseApi for util methods below? They both work
            dispatch(inctagramService.util.invalidateTags(['Me']))
            dispatch(inctagramService.util.resetApiState())
            void Router.replace('/')
          } catch (error: any) {
            toast.error(error.message || 'Log out failed')
          }
        },
        query: () => ({
          body: { baseUrl: 'http://localhost:3000' },
          credentials: 'include',
          headers: {
            // Добавляем токен авторизации из localStorage
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          headers: {
            // Добавляем токен авторизации из localStorage
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          method: 'POST',
          url: `/v1/auth/logout`,
        }),
      }),
      me: builder.query<MeResponse, void>({
        providesTags: ['Me'],
        query: () => ({
          credentials: 'include',
          url: '/v1/auth/me',
        }),
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
  useLogOutMutation,
  useMeQuery,
  useResendEmailMutation,
  useSendResetPasswordEmailMutation,
  useSignInMutation,
  useSignUpMutation,
} = AuthService
