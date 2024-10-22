import React from 'react'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  VKIcon,
  VKShareButton,
  ViberIcon,
  ViberShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from 'react-share'

import { Typography } from '@bitovyevolki/ui-kit-int'

import s from './sharePost.module.scss'

type SharePostProps = {
  iconSize?: number
  onClose?: () => void
  postUrl: string
}

const shareButtons = [
  { Button: TelegramShareButton, Icon: TelegramIcon, key: 'telegram' },
  { Button: FacebookShareButton, Icon: FacebookIcon, key: 'facebook' },
  { Button: TwitterShareButton, Icon: XIcon, key: 'twitter' },
  { Button: VKShareButton, Icon: VKIcon, key: 'vk' },
  { Button: WhatsappShareButton, Icon: WhatsappIcon, key: 'whatsapp' },
  { Button: LinkedinShareButton, Icon: LinkedinIcon, key: 'linkedin' },
  { Button: ViberShareButton, Icon: ViberIcon, key: 'viber' },
  { Button: EmailShareButton, Icon: EmailIcon, key: 'email' },
]

export const SharePost = ({ iconSize = 36, onClose, postUrl }: SharePostProps) => {
  return (
    <div className={s.shareOptions}>
      <Typography variant={'h2'}>{'Share On:'}</Typography>
      <div className={s.buttons}>
        {shareButtons.map(({ Button, Icon, key }) => (
          <Button key={key} onClick={onClose} url={postUrl}>
            <Icon className={s.icon} size={iconSize} />
          </Button>
        ))}
      </div>
    </div>
  )
}
