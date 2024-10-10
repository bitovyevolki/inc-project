import { inctagramService } from '@/src/shared/model/inctagram.service'

import { GetUsersByNameArgs, IUsersResponse } from '../model/user-model'

export const UserService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      getUserByUserName: builder.query<IUsersResponse, GetUsersByNameArgs>({
        query: ({ pageNumber = 1, pageSize = 12, search }) => {
          return {
            method: 'GET',
            params: { pageNumber, pageSize, search },
            url: `/v1/users`,
          }
        },
      }),
    }
  },
})

export const { useGetUserByUserNameQuery } = UserService
