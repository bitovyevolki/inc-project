import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { RoundLoader } from '@/src/shared/ui/RoundLoader/RoundLoader'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Typography } from '@bitovyevolki/ui-kit-int'

import s from './CommentsList.module.scss'

import { useGetPostCommentsQuery, useUpdateCommentLikeMutation } from '../../model/posts.service'
import { Comment as CommentType } from '../../model/posts.service.types'
import { CommentItem } from '../commentItem/CommentItem'

type Props = {
  description: string
  postId: number
}

export const CommentsList = ({ description, postId }: Props) => {
  const [commentsPage, setCommentsPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [comments, setComments] = useState<CommentType[]>([])
  const loadMoreRef = useRef<HTMLParagraphElement>(null)

  const { data: commentsData, isLoading: isLoadingComments } = useGetPostCommentsQuery({
    pageNumber: commentsPage,
    postId,
  })

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
  }, [commentsData])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && comments.length < totalCount) {
        setCommentsPage(commentsPage + 1)
      }
    })

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
    }
  }, [loadMoreRef, comments.length, totalCount])

  if (isLoadingComments) {
    return <Loader />
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
