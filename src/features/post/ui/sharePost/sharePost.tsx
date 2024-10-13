import { useState } from 'react'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  VKIcon,
  VKShareButton,
  XIcon,
} from 'react-share'

import { PaperPlaneIcon } from '@/src/shared/assets/icons/paper-plane'

import s from './sharePost.module.scss'

type SharePostProps = {
  postUrl: string
}

export const SharePost = ({ postUrl }: SharePostProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleShareOptions = () => {
    setIsOpen(!isOpen)
  }

  const closeShareOptions = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div onClick={toggleShareOptions}>
        <PaperPlaneIcon />
      </div>

      {isOpen && (
        <>
          <div className={s.overlay} onClick={closeShareOptions} />
          <div className={s.sharePost}>
            <div className={s.shareOptions}>
              <TelegramShareButton url={postUrl}>
                <TelegramIcon className={s.icon} size={32} />
              </TelegramShareButton>
              <FacebookShareButton url={postUrl}>
                <FacebookIcon className={s.icon} size={32} />
              </FacebookShareButton>
              <TwitterShareButton url={postUrl}>
                <XIcon className={s.icon} size={32} />
              </TwitterShareButton>
              <VKShareButton url={postUrl}>
                <VKIcon className={s.icon} size={32} />
              </VKShareButton>
              <EmailShareButton url={postUrl}>
                <EmailIcon className={s.icon} size={32} />
              </EmailShareButton>
            </div>
          </div>
        </>
      )}
    </>
  )
}
