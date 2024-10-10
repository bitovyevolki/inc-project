import { inctagramService } from '@/src/shared/model/inctagram.service'

import { GetFollowersPostsArgs, IGetFollowersPostsResponse } from '../model/types'

export const FollowersPostsService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      getFollowersPosts: builder.query<IGetFollowersPostsResponse, GetFollowersPostsArgs>({
        query: args => {
          const params = new URLSearchParams({
            pageSize: args.pageSize?.toString() || '12',
          })

          if (args.endCursorPostId) {
            params.append('endCursorPostId', args.endCursorPostId.toString())
          }

          return {
            method: 'GET',
            url: `/v1/home/publications-followers?${params.toString()}`,
          }
        },
      }),
    }
  },
})

export const { useGetFollowersPostsQuery } = FollowersPostsService
