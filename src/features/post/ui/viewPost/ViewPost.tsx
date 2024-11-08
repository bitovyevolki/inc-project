import React, { useState } from 'react'
import { toast } from 'react-toastify'

import { IProfile } from '@/src/entities/profile/userProfile/model/types/profile'
import { useMeQuery } from '@/src/features/auth/service/auth.service'
import { IFollowersPostsItem } from '@/src/features/home/followers-posts/model/types'
import { useDeletePostByIdMutation } from '@/src/features/post/model/posts.service'
import { ProfileIntro } from '@/src/features/post/ui'
import { AddCommentForm } from '@/src/features/post/ui/add-comment-form/AddCommentForm'
import { PostDescription } from '@/src/features/post/ui/postDescription/PostDescription'
import { PostReactions } from '@/src/features/post/ui/postReactions/Postreactions'
import { SharePost } from '@/src/features/post/ui/sharePost/sharePost'
import { PhotoSlider } from '@/src/shared/ui/PhotoSlider/PhotoSlider'
import { Card } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'

import 'moment/locale/ru'

import s from './viewPost.module.scss'

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
  const [addedComment, setAddedComment] = useState<CommentType | null>(null)
  const [deletePost] = useDeletePostByIdMutation()
  const [isEditMode, setIsEditMode] = useState(false)
  const [isShareMode, setIsShareMode] = useState<boolean>(false)
  const postOwner = post.ownerId === me?.userId

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

  const startEditMode = () => {
    setIsEditMode(true)
  }
  const stopEditMode = () => {
    setIsEditMode(false)
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
        <div className={s.descriptionBlock}>
          <PostDescription
            isEditMode={isEditMode}
            onStopEditMode={stopEditMode}
            ownerId={post.ownerId}
            postDescription={post.description}
            postId={post.id}
          />
          {!isEditMode && (
            <CommentsList
              addedComment={addedComment}
              isAuthorized={!!me}
              postId={post.id}
              setAddedComment={setAddedComment}
            />
          )}
        </div>
        {isShareMode ? (
          <SharePost onClose={closeShareOptions} postUrl={window.location.href} />
        ) : null}

        <div className={s.reactToPost}>
          <PostReactions
            createdAt={post.createdAt}
            isAuthorized={Boolean(me)}
            likesCount={post.likesCount}
            onShareClick={toggleShareOptions}
            postId={post.id}
          />
          {me && <AddCommentForm postId={post.id} setAddedComment={setAddedComment} />}
        </div>
      </div>
    </Card>
  )
}
