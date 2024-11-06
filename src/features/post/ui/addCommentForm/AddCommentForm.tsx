import React, { FC, FormEvent, useState } from 'react'

import { useCreateCommentToPostMutation } from '@/src/features/post/model/posts.service'
import { Comment as CommentType } from '@/src/features/post/model/posts.service.types'
import { Button, Input } from '@bitovyevolki/ui-kit-int'

import s from './AddCommentForm.module.scss'
export type AddCommentFormProps = {
  postId: number
  setAddedComment: (comment: CommentType | null) => void
}
export const AddCommentForm: FC<AddCommentFormProps> = ({ postId, setAddedComment }) => {
  const [createComment] = useCreateCommentToPostMutation()

  const [inputValue, setInputValue] = useState('')
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const content = inputValue

    setInputValue('')

    createComment({ content, postId: postId })
      .unwrap()
      .then(comment => {
        setAddedComment(comment)
      })
  }

  return (
    <form className={s.leaveComment} onSubmit={e => handleSubmit(e)}>
      <Input
        autoComplete={'off'}
        errorMessage={inputValue.length > 300 ? 'Comment must not exceed 300 characters.' : ''}
        inputMode={'text'}
        name={'leaveComment'}
        onChange={e => setInputValue(e.currentTarget.value)}
        placeholder={'Add a comment...'}
        rootClassName={s.customInput}
        value={inputValue}
      />
      <Button
        disabled={inputValue.length === 0 || inputValue.length > 300}
        type={'submit'}
        variant={'ghost'}
      >
        Publish
      </Button>
    </form>
  )
}
