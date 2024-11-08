import React, { ChangeEvent, FC, FormEvent, useState } from 'react'

import { useCreateCommentToPostMutation } from '@/src/features/post/model/posts.service'
import { Comment as CommentType } from '@/src/features/post/model/posts.service.types'
import { RoundLoader } from '@/src/shared/ui/RoundLoader/RoundLoader'
import { Button, Input } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'

import s from './AddCommentForm.module.scss'

interface IProps {
  postId: number
  refetchComments?: () => void
  setAddedComment?: (comment: CommentType | null) => void
}

export const AddCommentForm: FC<IProps> = ({ postId, refetchComments, setAddedComment }) => {
  const t = useTranslations('FollowersPosts')

  const [comment, setComment] = useState('')
  const [createComment, { isLoading }] = useCreateCommentToPostMutation()
  const createCommentHandler = () => {
    createComment({ content: comment, postId })
      .unwrap()
      .then(commentData => {
        setComment('')
        if (refetchComments) {
          refetchComments()
        }
        if (setAddedComment) {
          setAddedComment(commentData)
        }
      })
  }
  const changeCommentHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value

    if (value.length > 300) {
      return
    }

    setComment(value)
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    createCommentHandler()
  }

  const isDisabledBtn = comment.length === 0 || comment.length === 300 || isLoading

  const btnChildren = isLoading ? (
    <div className={s.btnLoaderWrapper}>
      <RoundLoader variant={'small'} />
    </div>
  ) : (
    t('publish')
  )

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <Input
        autoComplete={'off'}
        errorMessage={comment.length === 300 ? t('comment-length-error') : ''}
        onChange={changeCommentHandler}
        placeholder={t('com-form-place')}
        value={comment}
      />
      <Button disabled={isDisabledBtn} type={'submit'} variant={'ghost'}>
        {btnChildren}
      </Button>
    </form>
  )
}
