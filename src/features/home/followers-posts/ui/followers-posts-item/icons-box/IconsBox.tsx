import { useUpdatePostLikeMutation } from '@/src/features/post/model/posts.service'
import { BookmarkIcon, LikeIcon, MessageIcon, PaperPlaneIcon } from '@/src/shared/assets/icons'
import { RouterPaths } from '@/src/shared/config/router.paths'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from './IconsBox.module.scss'

interface IProps {
  copyUrl: () => void
  isLiked?: boolean
  ownerId: number
  postId: number
}

export const IconsBox = ({ copyUrl, isLiked, ownerId, postId }: IProps) => {
  const [updatePostLikeStatus] = useUpdatePostLikeMutation()

  const router = useRouter()

  const toMessengerHandler = () => {
    router.push(`${RouterPaths.MESSENGER}?userId=${ownerId}`)
  }

  const addLikeHandler = () => {
    updatePostLikeStatus({ likeStatus: isLiked ? 'DISLIKE' : 'LIKE', postId })
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
      <PaperPlaneIcon className={s.icon} onClick={copyUrl} />
      <BookmarkIcon className={clsx(s.lastIcon, s.icon)} />
    </div>
  )
}
