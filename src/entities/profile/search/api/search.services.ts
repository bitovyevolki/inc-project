import { inctagramService } from '@/src/shared/model/inctagram.service'
import { IUsersResponse } from '../model/user-model'

export const UserService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      getUserByUserName: builder.query<IUsersResponse, { userName: string; cursor?: number }>({
        query: ({ userName, cursor }) => {
          const queryParams = new URLSearchParams({
            search: userName,
          })

          if (cursor !== undefined) {
            queryParams.append('cursor', cursor.toString())
          }

          return {
            method: 'GET',
            url: `/v1/users?${queryParams.toString()}`,
          }
        },
      }),
    }
  },
})

export const { useGetUserByUserNameQuery } = UserService
