import {
  CreateCommentArgs,
  CreateCommentResponse,
  CreatePostArgs,
  CreatePostResponse,
  DeletePostArgs,
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
  UpdatePostArgs,
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
        invalidatesTags: ['Post'],
        query: queryArgs => {
          return {
            body: queryArgs,
            method: 'POST',
            url: '/v1/posts',
          }
        },
      }),
      deletePostById: builder.mutation<void, DeletePostArgs>({
        query: ({ postId }) => {
          return {
            method: 'DELETE',
            url: `v1/posts/${postId}`,
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
            url: `/v1/public-posts/${queryArgs.postId}`,
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
        providesTags: ['Post'],
        query: queryArgs => {
          return {
            credentials: 'include',
            params: { pageSize: queryArgs.pageSize },
            url: `v1/public-posts/user/${queryArgs.userId}/${queryArgs.endCursorPostId}`,
          }
        },
      }),
      updatePostById: builder.mutation<void, UpdatePostArgs>({
        async onQueryStarted({ ownerId, postId, updatedPostData }, { dispatch, queryFulfilled }) {
          const numericOwnerId = Number(ownerId)

          const patchResult = dispatch(
            PostsService.util.updateQueryData(
              'getPublicPostsByUserId',
              { userId: numericOwnerId },
              draft => {
                const index = draft.items.findIndex(post => post.id === Number(postId))

                if (index !== -1) {
                  Object.assign(draft.items[index], updatedPostData)
                }
              }
            )
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        query: ({ postId, updatedPostData }) => {
          return {
            body: updatedPostData,
            method: 'PUT',
            url: `v1/posts/${postId}`,
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
  useDeletePostByIdMutation,
  useGetPostByIdQuery,
  useGetPostCommentsQuery,
  useGetPostsByUserNameQuery,
  useGetPublicPostsAllQuery,
  useGetPublicPostsByUserIdQuery,
  useLazyGetPostCommentsQuery,
  useLazyGetPublicPostsByUserIdQuery,
  useUpdatePostByIdMutation,
  useUploadImagesMutation,
} = PostsService
