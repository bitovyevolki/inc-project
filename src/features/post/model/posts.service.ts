import { inctagramService } from '@/src/shared/model/inctagram.service'

export const PostsService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      checkPasswordRecoveryCode: builder.query<void, any>({
        query: queryArgs => {
          return {
            body: queryArgs,
            method: 'POST',
            url: '/v1/auth/check-recovery-code',
          }
        },
      }),
    }
  },
})
