import { ChangeEvent, useState } from 'react'

import { useCreateCommentToPostMutation } from '@/src/features/post/model/posts.service'
import { RoundLoader } from '@/src/shared/ui/RoundLoader/RoundLoader'
import { Button, Input } from '@bitovyevolki/ui-kit-int'

import s from './AddCommentForm.module.scss'

interface IProps {
  postId: number
  refetchComments?: () => void
}

export const AddCommentForm = ({ postId, refetchComments }: IProps) => {
  const [comment, setComment] = useState('')

  const [createComment, { isLoading }] = useCreateCommentToPostMutation()

  const createCommentHandler = () => {
    createComment({ content: comment, postId })
      .unwrap()
      .then(() => {
        setComment('')
        refetchComments && refetchComments()
      })
  }

  const changeCommentHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value

    if (value.length > 300) {
      return
    }

    setComment(value)
  }

  const isDisabledBtn = comment.length === 0 || comment.length === 300 || isLoading

  const btnChildren = isLoading ? (
    <div className={s.btnLoaderWrapper}>
      <RoundLoader variant={'small'} />
    </div>
  ) : (
    'Publish'
  )

  return (
    <div className={s.form}>
      <Input
        autoComplete={'off'}
        errorMessage={comment.length === 300 ? 'Comment must not exceed 300 characters.' : ''}
        onChange={changeCommentHandler}
        placeholder={'Add a comment...'}
        value={comment}
      />
      <Button disabled={isDisabledBtn} onClick={createCommentHandler} variant={'ghost'}>
        {btnChildren}
      </Button>
    </div>
  )
}
