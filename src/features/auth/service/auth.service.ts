import { SignUpArgs } from '@/src/features/auth/service/auth.types'
import { inctagramService } from '@/src/shared/model/inctagram.service'

export const AuthService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      /// ADD Your Endpoints
      signUp: builder.mutation<void, SignUpArgs>({
        query(data) {
          return {
            body: { ...data, baseUrl: 'http://localhost:3000' },
            method: 'POST',
            url: '/v1/auth/registration',
          }
        },
      }),
    }
  },
})
export const { useSignUpMutation } = AuthService
