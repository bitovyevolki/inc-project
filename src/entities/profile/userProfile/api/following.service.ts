import { inctagramService } from '@/src/shared/model/inctagram.service'

import { GetProfileByIdArgs, IProfile, UpdateGeneralProfileArgs } from '../model/types/profile'

export const FollowingService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      // Пример уже существующих endpoints для профиля
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
      }),

      // Создание подписки на пользователя
      followUser: builder.mutation<void, { userId: number }>({
        query: ({ userId }) => {
          return {
            body: { userId },
            method: 'POST',
            url: 'v1/users/following',
          }
        },
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
      }),
      // Другие методы...
    }
  },
})

// Экспортируем хук для использования этих запросов в компонентах
export const {
  useDeleteFollowerMutation,
  useFollowUserMutation,
  useGetFollowersByUserNameQuery,
  useGetFollowingByUserNameQuery,
} = FollowingService
