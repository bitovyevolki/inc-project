import { toast } from 'react-toastify'

import { useUpdatePostLikeMutation } from '@/src/features/post/model/posts.service'
import { BookmarkIcon, LikeIcon, MessageIcon, PaperPlaneIcon } from '@/src/shared/assets/icons'
import { RouterPaths } from '@/src/shared/config/router.paths'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from './IconsBox.module.scss'

interface IProps {
  isLiked?: boolean
  ownerId: number
  postId: number
}

export const IconsBox = ({ isLiked, ownerId, postId }: IProps) => {
  const [updatePostLikeStatus] = useUpdatePostLikeMutation()

  const router = useRouter()

  const copyUrlToClipboardHandler = () => {
    navigator.clipboard.writeText(
      `${window.location.toString()}${RouterPaths.MY_PROFILE.slice(1)}/${ownerId}?postId=${postId}`
    )

    toast.success('The link has been copied!', { position: 'top-right' })
  }

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
      <PaperPlaneIcon className={s.icon} onClick={copyUrlToClipboardHandler} />
      <BookmarkIcon className={clsx(s.lastIcon, s.icon)} />
    </div>
  )
}
