import { inctagramService } from '@/src/shared/model/inctagram.service'

import { GetProfileByIdArgs, IProfile, UpdateGeneralProfileArgs } from '../model/types/profile'

export const FollowingService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      createProfileAvatar: builder.mutation<Pick<IProfile, 'avatars'>, { file: FormData }>({
        invalidatesTags: ['Profile'],
        query: ({ file }) => {
          return {
            body: file,
            method: 'POST',
            url: 'v1/users/profile/avatar',
          }
        },
      }),

      // Удаление подписки на пользователя
      deleteFollower: builder.mutation<void, { userId: number }>({
        query: ({ userId }) => {
          return {
            method: 'DELETE',
            url: `v1/users/follower/${userId}`,
          }
        },
        // Добавляем invalidatesTags для обновления списков
        invalidatesTags: ['Followers', 'Following'],
      }),

      // Создание подписки на пользователя
      followUser: builder.mutation<void, { selectedUserId: number }>({
        query: ({ selectedUserId }) => {
          return {
            body: { selectedUserId },
            method: 'POST',
            url: 'v1/users/following',
          }
        },
        // Добавляем invalidatesTags для обновления списков
        invalidatesTags: ['Followers', 'Following'],
      }),

      // Получение списка подписчиков по имени пользователя
      getFollowersByUserName: builder.query<IProfile[], { userName: string }>({
        query: ({ userName }) => {
          return {
            method: 'GET',
            url: `v1/users/${userName}/followers`,
          }
        },
      }),

      // Получение списка подписок по имени пользователя
      getFollowingByUserName: builder.query<IProfile[], { userName: string }>({
        query: ({ userName }) => {
          return {
            method: 'GET',
            url: `v1/users/${userName}/following`,
          }
        },
        // Добавляем тег для отслеживания
        providesTags: ['Following'],
      }),

      // Получение списка всех пользователей
      getAllUsers: builder.query<IProfile[], void>({
        query: () => {
          return {
            method: 'GET',
            url: 'v1/users', // Здесь указываем новый URL
          }
        },
      }),
    }
  },
})

// Экспортируем хук для использования этих запросов в компонентах
export const {
  useDeleteFollowerMutation,
  useFollowUserMutation,
  useGetFollowersByUserNameQuery,
  useGetFollowingByUserNameQuery,
  useGetAllUsersQuery, // Экспортируем хук для нового запроса
} = FollowingService
