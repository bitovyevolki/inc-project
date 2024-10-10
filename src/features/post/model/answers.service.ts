import {
  Answer,
  CreateAnswerArgs,
  GetCommentAnswersArgs,
  GetCommentAnswersResponse,
  LikeAnswerArgs,
} from '@/src/features/post/model/posts.service.types'
import { inctagramService } from '@/src/shared/model/inctagram.service'

export const AnsversService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      createAnswer: builder.mutation<Answer, CreateAnswerArgs>({
        query: ({ commentId, content, postId }) => {
          return {
            body: { content },
            credentials: 'include',
            method: 'POST',
            url: `v1/posts/${postId}/comments/${commentId}/answers`,
          }
        },
      }),

      getAnswers: builder.query<GetCommentAnswersResponse, GetCommentAnswersArgs>({
        query: ({ commentId, pageNumber, pageSize = 5, postId }) => {
          return {
            credentials: 'include',
            params: { pageNumber, pageSize },
            url: `v1/posts/${postId}/comments/${commentId}/answers`,
          }
        },
      }),

      updateAnswerLike: builder.mutation<void, LikeAnswerArgs>({
        query: ({ answerId, commentId, likeStatus, postId }) => {
          return {
            body: { likeStatus },
            method: 'PUT',
            url: `v1/posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`,
          }
        },
      }),
    }
  },
})

export const { useCreateAnswerMutation, useGetAnswersQuery, useUpdateAnswerLikeMutation } =
  AnsversService
