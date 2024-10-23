import { AvatarIcon } from '@/src/shared/assets/icons/avatar'
import { Typography } from '@bitovyevolki/ui-kit-int'

import s from './dialogItem.module.scss'

type DialogProps = {
  activeChat: boolean
}

export const DialogItem = ({ activeChat }: DialogProps) => {
  return (
    <div className={`${s.wrap} ${activeChat ? s.active : ''}`}>
      <div className={s.icon}>
        <AvatarIcon />
      </div>
      <div className={s.content}>
        <div className={s.title}>
          <Typography variant={'body2'}>{'Ekaterina Ivanova'}</Typography>
        </div>
        <div className={s.message}>
          <Typography variant={'caption'}>
            <p className={s.messageColor}>{'Message'}</p>
          </Typography>
        </div>
      </div>
      <div className={s.date}>
        <Typography variant={'overline'}>{'31.aug'}</Typography>
      </div>
    </div>
  )
}
