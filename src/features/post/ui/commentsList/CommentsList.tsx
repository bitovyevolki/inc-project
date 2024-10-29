import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { RoundLoader } from '@/src/shared/ui/RoundLoader/RoundLoader'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Typography } from '@bitovyevolki/ui-kit-int'

import s from './CommentsList.module.scss'

import {
  useGetPostCommentsQuery,
  useGetPostCommentsUnAuthorizedQuery,
  useUpdateCommentLikeMutation,
} from '../../model/posts.service'
import { Comment as CommentType } from '../../model/posts.service.types'
import { CommentItem } from '../commentItem/CommentItem'

type Props = {
  description: string
  isAuthorized: boolean
  postId: number
}

export const CommentsList = ({ description, isAuthorized, postId }: Props) => {
  const [commentsPage, setCommentsPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [comments, setComments] = useState<CommentType[]>([])
  const loadMoreRef = useRef<HTMLParagraphElement>(null)

  const { data: commentsDataAuthorized, isLoading: isLoadingCommentsAuthorized } =
    useGetPostCommentsQuery({
      pageNumber: commentsPage,
      postId,
    })

  const { data: commentsDataUnauthorized, isLoading: isLoadingCommentsUnauthorized } =
    useGetPostCommentsUnAuthorizedQuery({ postId })

  const isLoadingComments = isAuthorized
    ? isLoadingCommentsAuthorized
    : isLoadingCommentsUnauthorized
  const commentsData = isAuthorized ? commentsDataAuthorized : commentsDataUnauthorized
  const [updateCommentLike] = useUpdateCommentLikeMutation()

  const handleCommentLikeStatus = (comment: CommentType) => {
    const newLikeStatus = comment.isLiked ? 'DISLIKE' : 'LIKE'

    updateCommentLike({
      commentId: comment.id,
      likeStatus: newLikeStatus,
      postId: comment.postId,
    })
      .unwrap()
      .then(() => {
        const newComments = comments.map(el => {
          if (el.id === comment.id) {
            return {
              ...el,
              isLiked: !comment.isLiked,
              likeCount: comment.isLiked ? el.likeCount - 1 : el.likeCount + 1,
            }
          } else {
            return el
          }
        })

        setComments(newComments)
      })
      .catch(error => {
        toast.error(`Failed change like status`)
      })
  }

  useEffect(() => {
    if (commentsData) {
      if (totalCount === 0) {
        setTotalCount(commentsData.totalCount)
      }
      setComments(prev => [...prev, ...commentsData.items])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentsData])

  useEffect(() => {
    const targetElement = loadMoreRef.current

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && comments.length < totalCount) {
        setCommentsPage(prevPage => prevPage + 1)
      }
    })

    if (targetElement) {
      observer.observe(targetElement)
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement)
      }
    }
  }, [loadMoreRef, comments.length, totalCount])

  if (isLoadingComments) {
    return <div className={s.commentsBlock}>Loading ... </div>
  }

  return (
    <div className={s.commentsBlock}>
      <Typography as={'div'} className={s.description} variant={'body1'}>
        {description}
      </Typography>
      <div className={s.commentsList}>
        {comments.map(comment => (
          <CommentItem
            comment={comment}
            handleCommentLikeStatus={handleCommentLikeStatus}
            key={comment.id}
          />
        ))}
      </div>
      {comments.length < totalCount && (
        <p className={s.loadMore} ref={loadMoreRef}>
          <RoundLoader variant={'small'} />
        </p>
      )}
    </div>
  )
}
