import { FormEvent, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { IProfile } from '@/src/entities/profile/userProfile/model/types/profile'
import { useMeQuery } from '@/src/features/auth/service/auth.service'
import {
  useCreateCommentToPostMutation,
  useDeletePostByIdMutation,
  useGetLikesByPostIdQuery,
  useLazyGetPostCommentsQuery,
  useUpdatePostByIdMutation,
  useUpdatePostLikeMutation,
} from '@/src/features/post/model/posts.service'
import { ProfileIntro } from '@/src/features/post/ui'
import { BookmarkIcon } from '@/src/shared/assets/icons/bookmark'
import { LikeIcon } from '@/src/shared/assets/icons/like'
import { PaperPlaneIcon } from '@/src/shared/assets/icons/paper-plane'
import { PhotoSlider } from '@/src/shared/ui/PhotoSlider/PhotoSlider'
import { formatDate } from '@/src/shared/utils/formatDate'
import { Button, Card, Input, TextArea, Typography } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'

import 'moment/locale/ru'

import s from './viewPost.module.scss'

import { usePostsParams } from '../../lib/hooks/usePostsParams'
import { Post } from '../../model/posts.service.types'
import { CommentsList } from '../commentsList/CommentsList'

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
  const { data: me } = useMeQuery()
  const { data: likes } = useGetLikesByPostIdQuery({ postId: post.id })
  const postOwner = post.ownerId === me?.userId
  const [description, setDescription] = useState(post.description || '')
  const [isEditMode, setIsEditMode] = useState(false)
  const likeColor = likes?.isLiked ? 'red' : 'white'

  const [updateComments] = useLazyGetPostCommentsQuery()
  const [createComment] = useCreateCommentToPostMutation()
  const [deletePost] = useDeletePostByIdMutation()
  const [updatePost] = useUpdatePostByIdMutation()
  const [updatePostLike] = useUpdatePostLikeMutation()

  const { changeQueryHandler } = usePostsParams()

  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  const copyUrlToClipboardHandler = () => {
    navigator.clipboard.writeText(window.location.toString())
  }

  const changePostLikeStatus = () => {
    const newLikeStatus = likes && likes.isLiked === true ? 'DISLIKE' : 'LIKE'

    updatePostLike({
      likeStatus: newLikeStatus,
      postId: post.id as number,
    })
      .unwrap()
      .catch(error => {
        toast.error(`Failed change like status`)
      })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const content = inputValue

    setInputValue('')

    createComment({ content, postId: post.id })
      .unwrap()
      .then(comment => {
        updateComments({ postId: post.id })
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
    deletePost({ ownerId: post.ownerId, postId: post.id })
      .unwrap()
      .then(() => {
        deletePostFromCombinedPostsArray && deletePostFromCombinedPostsArray(post.id)
        closePostModal()
        toast.success('Post deleted', { position: 'top-right' })
        setTimeout(() => (document.body.style.pointerEvents = ''), 0)
      })
      .catch(err => {
        toast.error(`Error deleting post: ${err}`, { position: 'top-right' })
      })
  }

  const displayDate = formatDate(post.createdAt)

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

        {isEditMode && (
          <div className={s.post}>
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
          </div>
        )}

        {isEditMode ? null : <CommentsList description={post.description} postId={post.id} />}

        <div className={s.reactToPost}>
          <div className={s.reactionsBox}>
            <div className={s.iconsBox}>
              <div className={s.leftBlock}>
                <div className={s.like} onClick={() => changePostLikeStatus()}>
                  <LikeIcon fill={likeColor} height={24} width={24} />
                </div>
                <div onClick={copyUrlToClipboardHandler}>
                  <PaperPlaneIcon />
                </div>
              </div>
              <div>
                <BookmarkIcon />
              </div>
            </div>
            <div className={s.likesInfo}>
              <div className={s.likesTopBlock}>
                {likes && likes.items.length > 0 && (
                  <div className={s.avatarsList}>
                    {likes?.items.map(user => (
                      <div key={user.id}>
                        <Image
                          alt={'ava'}
                          className={s.avatarsListItem}
                          height={24}
                          src={user.avatars[0].url}
                          width={24}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <Typography as={'span'} variant={'body2'}>
                  {likes?.totalCount}
                  {` "Like"`}
                </Typography>
              </div>
              <Typography className={s.postDate} variant={'caption'}>
                {displayDate}
              </Typography>
            </div>
          </div>

          {me && (
            <form className={s.leaveComment} onSubmit={e => handleSubmit(e)}>
              <Input
                autoComplete={'off'}
                errorMessage={
                  inputValue.length > 300 ? 'Comment must not exceed 300 characters.' : ''
                }
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
          )}
        </div>
      </div>
    </Card>
  )
}
