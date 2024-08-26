import {
  CreatePostArgs,
  CreatePostResponse,
  GetCommentAnswersArgs,
  GetCommentAnswersResponse,
  GetPostByIdArgs,
  GetPostByIdResponse,
  GetPostsByUserArgs,
  GetPostsByUserResponse,
  GetPostsCommentsArgs,
  GetPublicPostsByUserArgs,
  UploadImageResponse,
} from '@/src/features/post/model/posts.service.types'
import { inctagramService } from '@/src/shared/model/inctagram.service'

export const PostsService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
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
      getPostComments: builder.query<GetPostsByUserResponse, GetPostsCommentsArgs>({
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
  useCreatePostMutation,
  useGetPostByIdQuery,
  useGetPostsByUserNameQuery,
  useGetPublicPostsByUserIdQuery,
  useLazyGetPublicPostsByUserIdQuery,
  useUploadImagesMutation,
} = PostsService
