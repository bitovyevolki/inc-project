import { BookmarkIcon, HeartIcon, MessageIcon, PaperPlaneIcon } from '@/src/shared/assets/icons'
import { RouterPaths } from '@/src/shared/config/router.paths'
import clsx from 'clsx'

import s from './IconsBox.module.scss'

interface IProps {
  ownerId: number
  postId: number
}

export const IconsBox = ({ ownerId, postId }: IProps) => {
  const copyUrlToClipboardHandler = () => {
    navigator.clipboard.writeText(
      `${window.location.toString()}${RouterPaths.MY_PROFILE.slice(1)}/${ownerId}/${postId}`
    )
  }

  return (
    <div className={s.icons}>
      <HeartIcon className={s.icon} />
      <MessageIcon className={s.icon} />
      <PaperPlaneIcon className={s.icon} onClick={copyUrlToClipboardHandler} />
      <BookmarkIcon className={clsx(s.lastIcon, s.icon)} />
    </div>
  )
}
