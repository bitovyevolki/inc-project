import { inctagramService } from '@/src/shared/model/inctagram.service'

import {
  DialogListResponse,
  GetDialogsListArgs,
  GetMessagesByIdArgs,
  GetMessagesResponse,
} from './messenger'

export const MessengerService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      getDialogs: builder.query<DialogListResponse, GetDialogsListArgs>({
        providesTags: ['Messenger'],
        query: ({ cursor, pageSize = 12, searchName }) => {
          return {
            method: 'GET',
            params: { cursor, pageSize, searchName },
            url: `/v1/messanger`,
          }
        },
      }),

      getMessagesByUserId: builder.query<GetMessagesResponse, GetMessagesByIdArgs>({
        query: ({ cursor, dialoguePartnerId, pageSize = 12, searchName }) => {
          return {
            method: 'GET',
            params: { cursor, pageSize, searchName },
            url: `/v1/messanger/${dialoguePartnerId}`,
          }
        },
      }),
      updateMessagesStatus: builder.mutation<void, { ids: number[] }>({
        invalidatesTags: ['Messenger'],
        query: ({ ids }) => {
          return {
            body: { ids },
            method: 'PUT',
            url: '/v1/messanger',
          }
        },
      }),
    }
  },
})

export const { useGetDialogsQuery, useGetMessagesByUserIdQuery, useUpdateMessagesStatusMutation } =
  MessengerService
