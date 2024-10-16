import { inctagramService } from '@/src/shared/model/inctagram.service'

import { GetFollowersPostsArgs, IGetFollowersPostsResponse } from '../model/types'

export const FollowersPostsService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      getFollowersPosts: builder.query<IGetFollowersPostsResponse, GetFollowersPostsArgs>({
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg
        },
        merge: (currentCache, newItems) => {
          currentCache.items.push(...newItems.items)
        },
        query: args => {
          const params = new URLSearchParams({
            pageSize: args.pageSize?.toString() || '8',
          })

          if (args.endCursorPostId) {
            params.append('endCursorPostId', args.endCursorPostId.toString())
          }

          return {
            method: 'GET',
            url: `/v1/home/publications-followers?${params.toString()}`,
          }
        },
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName
        },
      }),
    }
  },
})

export const { useGetFollowersPostsQuery } = FollowersPostsService
