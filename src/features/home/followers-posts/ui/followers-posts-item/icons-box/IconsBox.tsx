import React, { useState } from 'react'

import { useUpdatePostLikeMutation } from '@/src/features/post/model/posts.service'
import { SharePost } from '@/src/features/post/ui/sharePost/sharePost'
import { ViewPostModal } from '@/src/features/post/ui/viewPostModal'
import { BookmarkIcon, LikeIcon, MessageIcon, PaperPlaneIcon } from '@/src/shared/assets/icons'
import { RouterPaths } from '@/src/shared/config/router.paths'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from './IconsBox.module.scss'

interface IProps {
  isLiked?: boolean
  ownerId: number
  postId: number
  postUrl: string
}

export const IconsBox = ({ isLiked, ownerId, postId, postUrl }: IProps) => {
  const [updatePostLikeStatus] = useUpdatePostLikeMutation()
  const [shareMode, setShareMode] = useState<boolean>(false)

  const router = useRouter()

  const toMessengerHandler = () => {
    router.push(`${RouterPaths.MESSENGER}?partnerId=${ownerId}`)
  }

  const addLikeHandler = () => {
    updatePostLikeStatus({ likeStatus: isLiked ? 'DISLIKE' : 'LIKE', postId })
  }
  const openShareModal = () => {
    setShareMode(true)
  }

  const closeShareModal = () => {
    setShareMode(false)
  }

  const likeColor = isLiked ? 'red' : 'white'

  return (
    <div className={s.icons}>
      <LikeIcon
        className={s.icon}
        fill={likeColor}
        height={24}
        onClick={addLikeHandler}
        width={24}
      />
      <MessageIcon className={s.icon} onClick={toMessengerHandler} />
      <PaperPlaneIcon className={s.icon} onClick={openShareModal} />
      <BookmarkIcon className={clsx(s.lastIcon, s.icon)} />
      {shareMode && (
        <ViewPostModal isOpen={shareMode} onOpenChange={closeShareModal}>
          <SharePost onClose={closeShareModal} postUrl={postUrl} />
        </ViewPostModal>
      )}
    </div>
  )
}
