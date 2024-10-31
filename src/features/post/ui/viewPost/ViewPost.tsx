import React, { FormEvent, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import baseAvatar from '@/public/image/default-avatar.webp'
import { IProfile } from '@/src/entities/profile/userProfile/model/types/profile'
import { useMeQuery } from '@/src/features/auth/service/auth.service'
import { IFollowersPostsItem } from '@/src/features/home/followers-posts/model/types'
import {
  useCreateCommentToPostMutation,
  useDeletePostByIdMutation,
  useGetLikesByPostIdQuery,
  useUpdatePostByIdMutation,
  useUpdatePostLikeMutation,
} from '@/src/features/post/model/posts.service'
import { ProfileIntro } from '@/src/features/post/ui'
import { SharePost } from '@/src/features/post/ui/sharePost/sharePost'
import { PaperPlaneIcon } from '@/src/shared/assets/icons'
import { BookmarkIcon } from '@/src/shared/assets/icons/bookmark'
import { LikeIcon } from '@/src/shared/assets/icons/like'
import { PhotoSlider } from '@/src/shared/ui/PhotoSlider/PhotoSlider'
import { formatDate } from '@/src/shared/utils/formatDate'
import { Button, Card, Input, TextArea, Typography } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'

import 'moment/locale/ru'

import s from './viewPost.module.scss'

import { usePostsParams } from '../../lib/hooks/usePostsParams'
import { Comment as CommentType, Post } from '../../model/posts.service.types'
import { CommentsList } from '../commentsList/CommentsList'

type Props = {
  avatars?: IProfile['avatars'] | string
  closePostModal: () => void
  deletePostFromCombinedPostsArray?: (postId: number) => void
  post: IFollowersPostsItem | Post
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
  const [isShareMode, setIsShareMode] = useState<boolean>(false)
  const toggleShareOptions = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsShareMode(!isShareMode)
  }

  const closeShareOptions = () => {
    setIsShareMode(false)
  }

  document.onclick = () => {
    if (isShareMode) {
      closeShareOptions()
    }
  }
  const likeColor = likes?.isLiked ? 'red' : 'white'

  const [createComment] = useCreateCommentToPostMutation()
  const [deletePost] = useDeletePostByIdMutation()
  const [updatePost] = useUpdatePostByIdMutation()
  const [updatePostLike] = useUpdatePostLikeMutation()

  const [addedComment, setAddedComment] = useState<CommentType | null>(null)

  const { changeQueryHandler } = usePostsParams()

  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  const changePostLikeStatus = () => {
    const newLikeStatus = likes && likes.isLiked ? 'DISLIKE' : 'LIKE'

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
        setAddedComment(comment)
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
              <Image
                alt={`Post image ${index}`}
                fill
                priority
                sizes={'(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 460px'}
                src={image.url}
              />
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
        {!isEditMode && (

          <div className={s.descriptionBlock}>
            {post.description && (
              <Typography as={'div'} className={s.description} variant={'body1'}>
                {post.description}
              </Typography>
            )}
            <CommentsList
            addedComment={addedComment}
            isAuthorized={!!me}
            postId={post.id}
            setAddedComment={setAddedComment}
          />
          </div>
        )}
        {isShareMode ? (
          <SharePost onClose={closeShareOptions} postUrl={window.location.href} />
        ) : null}

        {me && (
          <div className={s.reactToPost}>
            <div className={s.reactionsBox}>
              <div className={s.iconsBox}>
                <div className={s.leftBlock}>
                  <div className={s.like} onClick={() => changePostLikeStatus()}>
                    <LikeIcon fill={likeColor} height={24} width={24} />
                  </div>
                  <div onClick={toggleShareOptions}>
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
                            src={user.avatars.length > 0 ? user.avatars[0].url : baseAvatar}
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
          </div>
        )}
        {!me && (
          <div className={s.reactToPost}>
            <div className={s.reactionsBox}>
              <div className={s.likesInfo}>
                <div className={s.likesTopBlock}>
                  <Typography as={'span'} variant={'body2'}>
                    {post.likesCount}
                    {` "Like"`}
                  </Typography>
                </div>
                <Typography className={s.postDate} variant={'caption'}>
                  {displayDate}
                </Typography>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
