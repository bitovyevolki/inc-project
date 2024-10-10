import {
  GetFollowResponse,
  GetUserProfileResponse,
} from '@/src/features/post/model/posts.service.types'
import { inctagramService } from '@/src/shared/model/inctagram.service'

export const FollowService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      followUser: builder.mutation<void, { selectedUserId: number }>({
        invalidatesTags: ['Follow'],
        query: ({ selectedUserId }) => {
          return {
            body: { selectedUserId },
            method: 'POST',
            url: 'v1/users/following',
          }
        },
      }),
      getAllUsers: builder.query<GetUserProfileResponse, { userName: string }>({
        providesTags: ['Follow'],
        query: ({ userName }) => {
          return {
            method: 'GET',
            url: `v1/users/${userName}`,
          }
        },
      }),
      getFollowersByUserName: builder.query<GetFollowResponse, { userName: string }>({
        query: ({ userName }) => {
          return {
            method: 'GET',
            url: `v1/users/${userName}/followers`,
          }
        },
        // providesTags: ['Following'],
      }),
      getFollowingByUserName: builder.query<GetFollowResponse, { userName: string }>({
        query: ({ userName }) => {
          return {
            method: 'GET',
            url: `v1/users/${userName}/following`,
          }
        },
        // providesTags: ['Following'],
      }),
      unFollow: builder.mutation<void, { userId: number }>({
        invalidatesTags: ['Follow'],
        query: ({ userId }) => {
          return {
            method: 'DELETE',
            url: `v1/users/follower/${userId}`,
          }
        },
      }),
    }
  },
})

export const {
  useFollowUserMutation,
  useGetAllUsersQuery,
  useGetFollowersByUserNameQuery,
  useGetFollowingByUserNameQuery,
  useUnFollowMutation,
} = FollowService
