import { inctagramService } from '@/src/shared/model/inctagram.service'

import { IErrorResponse, IMarkAsReadRequest, INotificationsResponse } from '../models/notifications'

export const NotificationsAPI = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      // Удаление уведомления по ID
      deleteNotificationById: builder.mutation<void, { id: number }>({
        invalidatesTags: ['Notifications'],
        query: ({ id }) => {
          return {
            method: 'DELETE',
            url: `/v1/notifications/${id}`,
          }
        },
        transformResponse: (response: IErrorResponse) => {
          if (response.error) {
            throw new Error(response.messages[0]?.message || 'Error occurred')
          }
        },
      }),
      // Получение уведомлений по профилю
      getNotificationsByProfile: builder.query<INotificationsResponse, { cursor: string }>({
        providesTags: ['Notifications'],
        query: ({ cursor }) => {
          return {
            method: 'GET',
            url: `/v1/notifications/${cursor}`,
          }
        },
      }),
      // Пометка уведомлений как прочитанных
      markNotificationsAsRead: builder.mutation<void, IMarkAsReadRequest>({
        invalidatesTags: ['Notifications'],
        query: ({ ids }) => {
          return {
            body: { ids },
            method: 'POST',
            url: '/v1/notifications/mark-as-read',
          }
        },
        transformResponse: (response: IErrorResponse) => {
          if (response.error) {
            throw new Error(response.messages[0]?.message || 'Error occurred')
          }
        },
      }),
    }
  },
})

export const {
  useDeleteNotificationByIdMutation,
  useGetNotificationsByProfileQuery,
  useMarkNotificationsAsReadMutation,
} = NotificationsAPI
