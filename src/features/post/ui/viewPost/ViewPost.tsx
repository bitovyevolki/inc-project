import * as React from 'react'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { IProfile } from '@/src/entities/profile/model/types/profile'
import { useMeQuery } from '@/src/features/auth/service/auth.service'
import {
  useCreateCommentToPostMutation,
  useDeletePostByIdMutation,
  useGetPostCommentsQuery,
  useLazyGetPostCommentsQuery,
  useUpdatePostByIdMutation,
} from '@/src/features/post/model/posts.service'
import { ProfileIntro } from '@/src/features/post/ui'
import { BookmarkIcon } from '@/src/shared/assets/icons/bookmark'
import { HeartIcon } from '@/src/shared/assets/icons/heart'
import { PaperPlaneIcon } from '@/src/shared/assets/icons/paper-plane'
import { PhotoSlider } from '@/src/shared/ui/PhotoSlider/PhotoSlider'
import { Button, Card, Input, TextArea, Typography } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'

import s from './viewPost.module.scss'

import { usePostsParams } from '../../lib/hooks/usePostsParams'
import { Post } from '../../model/posts.service.types'

type Props = {
  avatars?: IProfile['avatars']
  closePostModal: () => void
  deletePostFromCombinedPostsArray?: (postId: number) => void
  post: Post
  userName: string
}

export const ViewPost = ({
  avatars,
  closePostModal,
  deletePostFromCombinedPostsArray,
  post,
  userName,
}: Props) => {
  const { data: commentsData } = useGetPostCommentsQuery({ postId: post?.id })

  const { data: me } = useMeQuery()
  const postOwner = post.ownerId === me?.userId
  const [description, setDescription] = useState(post?.description || '')
  const [isEditMode, setIsEditMode] = useState(false)
  const [updateComments] = useLazyGetPostCommentsQuery()
  const [createComment] = useCreateCommentToPostMutation()
  const [deletePost] = useDeletePostByIdMutation()
  const [updatePost] = useUpdatePostByIdMutation()

  const { changeQueryHandler } = usePostsParams()

  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  const copyUrlToClipboardHandler = () => {
    navigator.clipboard.writeText(window.location.toString())
  }

  const handleSubmit = () => {
    const content = inputValue

    setInputValue('')

    createComment({ content, postId: post?.id })
      .unwrap()
      .then(comment => {
        updateComments({ postId: post?.id })
      })
  }

  const startEditMode = () => {
    setIsEditMode(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const saveDescription = () => {
    updatePost({
      ownerId: String(post.ownerId),
      postId: String(post.id),
      updatedPostData: { description },
    })
      .unwrap()
      .then(() => {
        toast.success('Post description updated', { position: 'top-right' })
        changeQueryHandler(post.id as number)
        setIsEditMode(false)
      })
      .catch(err => {
        toast.error(`Error updating post: ${err}`, { position: 'top-right' })
      })
  }

  const deletePostHandler = () => {
    deletePost({ ownerId: post.ownerId, postId: post.id as number })
      .unwrap()
      .then(() => {
        deletePostFromCombinedPostsArray && deletePostFromCombinedPostsArray(post?.id as number)
        closePostModal()
        toast.success('Post deleted', { position: 'top-right' })
        setTimeout(() => (document.body.style.pointerEvents = ''), 0)
      })
      .catch(err => {
        toast.error(`Error deleting post: ${err}`, { position: 'top-right' })
      })
  }

  const commentsToShow = commentsData?.items.map(comment => {
    return (
      <div key={comment.id}>
        <ProfileIntro
          avatarSize={'small'}
          avatars={comment.from.avatars}
          postOwner={postOwner}
          userName={comment.from.username}
        />
        <Typography as={'p'} variant={'body1'}>
          {comment.content}
        </Typography>
      </div>
    )
  })

  return (
    <Card className={s.modalBox}>
      <div className={s.sliderBox}>
        <PhotoSlider>
          {post.images.map((image, index) => (
            <div className={s.photoBox} key={image.uploadId}>
              <Image alt={`Post image ${index}`} fill priority src={image.url} />
            </div>
          ))}
        </PhotoSlider>
      </div>

      <div className={s.textBox}>
        <div className={s.postHeader}>
          <ProfileIntro
            avatarSize={'small'}
            avatars={avatars}
            deletePost={deletePostHandler}
            postOwner={postOwner}
            updatePostHandler={startEditMode}
            userName={userName}
            withMenu
          />
        </div>
        <div className={s.post}>
          {isEditMode ? (
            <div className={s.descWrap}>
              <div>
                <TextArea
                  label={'Add description'}
                  onChange={e => setDescription(e.target.value)}
                  placeholder={'Edit description...'}
                  ref={inputRef}
                  value={description}
                />
              </div>
              <div>
                <Button onClick={saveDescription}>Save Changes</Button>
              </div>
            </div>
          ) : (
            <div>
              {/* <span>{post?.userName}</span> */}
              <span className={s.post}>{post?.description}</span>
            </div>
          )}
        </div>
        <div>
          {isEditMode ? null : (
            <div className={s.reactToPost}>
              <div className={s.reactionsBox}>
                <div className={s.iconsBox}>
                  <BookmarkIcon />
                  <HeartIcon />
                  <span onClick={copyUrlToClipboardHandler}>
                    <PaperPlaneIcon />
                  </span>
                </div>
              </div>
              {me && (
                <form className={s.leaveComment} onSubmit={handleSubmit}>
                  <Input
                    inputMode={'text'}
                    name={'leaveComment'}
                    onChange={e => setInputValue(e.currentTarget.value)}
                    placeholder={'Add a comment...'}
                    value={inputValue}
                  />
                  <Button disabled={inputValue.length === 0} type={'submit'} variant={'ghost'}>
                    Publish
                  </Button>
                </form>
              )}
              <div className={s.comments}>{commentsToShow} </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
