import React, { ChangeEvent, FC, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { usePostsParams } from '@/src/features/post/lib/hooks/usePostsParams'
import { useUpdatePostByIdMutation } from '@/src/features/post/model/posts.service'
import { Button, TextArea, Typography } from '@bitovyevolki/ui-kit-int'

import s from './PostDescription.module.scss'
type PostDescriptionProps = {
  isEditMode: boolean
  onStopEditMode?: () => void
  ownerId: number
  postDescription: string
  postId: number
}
export const PostDescription: FC<PostDescriptionProps> = ({
  isEditMode,
  onStopEditMode,
  ownerId,
  postDescription,
  postId,
}) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const { changeQueryHandler } = usePostsParams()
  const [updatePost] = useUpdatePostByIdMutation()
  const [description, setDescription] = useState(postDescription || '')
  const saveDescription = () => {
    updatePost({
      ownerId: String(ownerId),
      postId: String(postId),
      updatedPostData: { description },
    })
      .unwrap()
      .then(() => {
        toast.success('Post description updated', { position: 'top-right' })
        changeQueryHandler(postId as number)
        if (onStopEditMode) {
          onStopEditMode()
        }
      })
      .catch(err => {
        toast.error(`Error updating post: ${err}`, { position: 'top-right' })
      })
  }
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  return (
    <div>
      {isEditMode && (
        <div className={s.descWrap}>
          <div>
            <TextArea
              label={'Add description'}
              onChange={handleDescriptionChange}
              placeholder={'Edit description...'}
              ref={inputRef}
              value={description}
            />
          </div>
          <Button onClick={saveDescription}>Save Changes</Button>
        </div>
      )}
      {!isEditMode && (
        <>
          {postDescription && (
            <Typography as={'div'} className={s.description} variant={'body1'}>
              {postDescription}
            </Typography>
          )}
        </>
      )}
    </div>
  )
}
