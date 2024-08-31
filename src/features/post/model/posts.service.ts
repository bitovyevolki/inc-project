import {
  CreateCommentArgs,
  CreateCommentResponse,
  CreatePostArgs,
  CreatePostResponse,
  GetCommentAnswersArgs,
  GetCommentAnswersResponse,
  GetLastCreatedPostsArgs,
  GetLastCreatedPostsResponse,
  GetPostByIdArgs,
  GetPostByIdResponse,
  GetPostCommentsArgs,
  GetPostCommentsResponse,
  GetPostsByUserArgs,
  GetPostsByUserResponse,
  GetPublicPostsByUserArgs,
  UploadImageResponse,
} from '@/src/features/post/model/posts.service.types'
import { inctagramService } from '@/src/shared/model/inctagram.service'

export const PostsService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      createCommentToPost: builder.mutation<CreateCommentResponse, CreateCommentArgs>({
        query: ({ postId, ...queryArgs }) => {
          return {
            body: { ...queryArgs },
            credentials: 'include',
            method: 'POST',
            url: `v1/posts/${postId}/comments`,
          }
        },
      }),
      createPost: builder.mutation<CreatePostResponse, CreatePostArgs>({
        query: queryArgs => {
          return {
            body: queryArgs,
            method: 'POST',
            url: '/v1/posts',
          }
        },
      }),
      getCommentAnswers: builder.query<GetCommentAnswersResponse, GetCommentAnswersArgs>({
        query: queryArgs => {
          return {
            credentials: 'include',
            params: queryArgs,
            url: `/api/v1/posts/${queryArgs.postId}/comments/${queryArgs.commentId}/answers`,
          }
        },
      }),
      getPostById: builder.query<GetPostByIdResponse, GetPostByIdArgs>({
        query: queryArgs => {
          return {
            credentials: 'include',
            params: queryArgs,
            url: `/api/v1/public-posts/${queryArgs.postId}`,
          }
        },
      }),
      getPostComments: builder.query<GetPostCommentsResponse, GetPostCommentsArgs>({
        query: queryArgs => {
          return {
            credentials: 'include',
            params: queryArgs,
            url: `v1/posts/${queryArgs.postId}/comments`,
          }
        },
      }),
      getPostsByUserName: builder.query<GetPostsByUserResponse, GetPostsByUserArgs>({
        query: queryArgs => {
          return {
            credentials: 'include',
            params: queryArgs,
            url: `v1/posts/${queryArgs.userName}`,
          }
        },
      }),
      // getPublicPostsAll: builder.query<GetLastCreatedPostsResponse, GetLastCreatedPostsArgs>({
      //   query: queryArgs => {
      //     return {
      //       credentials: 'include',
      //       params: { pageSize: 4, ...queryArgs },
      //       url: `v1/public-posts/all`,
      //     }
      //   },
      // }),
      getPublicPostsAll: builder.query<GetLastCreatedPostsResponse, GetLastCreatedPostsArgs>({
        query: queryArgs => {
          const params = new URLSearchParams({
            pageSize: queryArgs.pageSize?.toString() || '4',
            sortBy: queryArgs.sortBy || 'createdAt',
            sortDirection: queryArgs.sortDirection || 'desc',
          })

          if (queryArgs.endCursorPostId) {
            params.append('endCursorPostId', queryArgs.endCursorPostId.toString())
          }

          return {
            credentials: 'include',
            url: `v1/public-posts/all?${params.toString()}`,
          }
        },
      }),
      getPublicPostsByUserId: builder.query<GetPostsByUserResponse, GetPublicPostsByUserArgs>({
        query: queryArgs => {
          return {
            credentials: 'include',
            params: { pageSize: 8, ...queryArgs },
            url: `v1/public-posts/user/${queryArgs.userId}/${queryArgs.endCursorPostId}`,
          }
        },
      }),

      uploadImages: builder.mutation<UploadImageResponse, { files: FileList }>({
        query: args => {
          const formData = new FormData()

          Array.from(args.files).forEach(file => {
            formData.append('file', file)
          })

          return {
            body: formData,
            method: 'POST',
            url: '/v1/posts/image',
          }
        },
      }),
    }
  },
})

export const {
  useCreateCommentToPostMutation,
  useCreatePostMutation,
  useGetPostByIdQuery,
  useGetPostCommentsQuery,
  useGetPostsByUserNameQuery,
  useGetPublicPostsAllQuery,
  useGetPublicPostsByUserIdQuery,
  useLazyGetPostCommentsQuery,
  useLazyGetPublicPostsByUserIdQuery,
  useUploadImagesMutation,
} = PostsService
