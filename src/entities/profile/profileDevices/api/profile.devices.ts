import { inctagramService } from '@/src/shared/model/inctagram.service'
import { IDevicesResponse } from '../model/types/devices'

export const ProfileDevices = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      //Получение списка устройст
      getDevices: builder.query<IDevicesResponse, void>({
        providesTags: ['Profile'],
        query: () => {
          return {
            method: 'GET',
            url: '/v1/sessions',
          }
        },
      }),
      // Удаление устройства по ID
      deleteDeviceById: builder.mutation<void, { deviceId: number }>({
        invalidatesTags: ['Profile'],
        query: ({ deviceId }) => {
          return {
            method: 'DELETE',
            url: `/v1/sessions/${deviceId}`,
          }
        },
      }),
      // Завершение всех сессий
      terminateAllSessions: builder.mutation<void, void>({
        invalidatesTags: ['Profile'],
        query: () => {
          return {
            method: 'DELETE',
            url: '/v1/sessions/terminate-all',
          }
        },
      }),
    }
  },
})

export const { useGetDevicesQuery, useDeleteDeviceByIdMutation, useTerminateAllSessionsMutation } =
  ProfileDevices
