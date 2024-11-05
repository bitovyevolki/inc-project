import React, { FC } from 'react'
import { toast } from 'react-toastify'

import baseAvatar from '@/public/image/default-avatar.webp'
import {
  useGetLikesByPostIdQuery,
  useUpdatePostLikeMutation,
} from '@/src/features/post/model/posts.service'
import { BookmarkIcon, LikeIcon, PaperPlaneIcon } from '@/src/shared/assets/icons'
import { formatDate } from '@/src/shared/utils/formatDate'
import { Typography } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'

import s from './Postreactions.module.scss'
type PostReactionsProps = {
  createdAt: Date | string
  isAuthorized: boolean
  likesCount: number
  onShareClick?: (e: any) => void
  postId: number
}
export const PostReactions: FC<PostReactionsProps> = ({
  createdAt,
  isAuthorized,
  likesCount,
  onShareClick,
  postId,
}) => {
  const { data: likes } = useGetLikesByPostIdQuery({ postId: postId })
  const [updatePostLike] = useUpdatePostLikeMutation()
  const likeColor = likes?.isLiked ? 'red' : 'white'

  const changePostLikeStatus = () => {
    const newLikeStatus = likes && likes.isLiked ? 'DISLIKE' : 'LIKE'

    updatePostLike({
      likeStatus: newLikeStatus,
      postId: postId,
    })
      .unwrap()
      .catch(error => {
        toast.error(`Failed change like status`)
      })
  }

  const displayDate = formatDate(createdAt)

  return (
    <div className={s.reactionsBox}>
      {isAuthorized && (
        <>
          <div className={s.iconsBox}>
            <div className={s.leftBlock}>
              <div className={s.like} onClick={() => changePostLikeStatus()}>
                <LikeIcon fill={likeColor} height={24} width={24} />
              </div>
              <div onClick={onShareClick}>
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
                        height={20}
                        src={user.avatars.length > 0 ? user.avatars[0].url : baseAvatar}
                        width={20}
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
        </>
      )}
      {!isAuthorized && (
        <div className={s.likesInfo}>
          <div className={s.likesTopBlock}>
            <Typography as={'span'} variant={'body2'}>
              {`${likesCount} "Like"`}
            </Typography>
          </div>
          <Typography className={s.postDate} variant={'caption'}>
            {displayDate}
          </Typography>
        </div>
      )}
    </div>
  )
}
