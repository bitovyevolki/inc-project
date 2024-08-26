import {
  CreatePostArgs,
  CreatePostResponse,
  GetPostsByUserArgs,
  GetPostsByUserResponse,
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
  useGetPostsByUserNameQuery,
  useGetPublicPostsByUserIdQuery,
  useLazyGetPublicPostsByUserIdQuery,
  useUploadImagesMutation,
} = PostsService