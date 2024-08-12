import { inctagramService } from '@/src/shared/model/inctagram.service'

import { IProfile, UpdateGeneralProfileArgs } from '../model/types/profile'

export const ProfileService = inctagramService.injectEndpoints({
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
      // delete profile for testing
      deleteProfile: builder.mutation<void, void>({
        query: () => {
          return {
            method: 'DELETE',
            url: 'v1/users/profile',
          }
        },
      }),
      deleteProfileAvatar: builder.mutation<void, void>({
        invalidatesTags: ['Profile'],
        query: () => {
          return {
            method: 'DELETE',
            url: 'v1/users/profile/avatar',
          }
        },
      }),
      // delete profile by id for testing
      deleteProfileById: builder.mutation<void, Pick<IProfile, 'id'>>({
        query: ({ id }) => {
          return {
            method: 'DELETE',
            url: `v1/users/profile/${id}`,
          }
        },
      }),
      getProfile: builder.query<IProfile, void>({
        providesTags: ['Profile'],
        query: () => {
          return {
            method: 'GET',
            url: 'v1/users/profile',
          }
        },
      }),
      updateProfile: builder.mutation<IProfile, UpdateGeneralProfileArgs>({
        invalidatesTags: ['Profile'],
        query: data => {
          return {
            body: data,
            method: 'PUT',
            url: 'v1/users/profile',
          }
        },
      }),
    }
  },
})

export const { useGetProfileQuery, useUpdateProfileMutation } = ProfileService