import { formatDateSmall } from '@/src/shared/utils/formatDate'
import { Typography } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'

import s from './dialogItem.module.scss'

import { DialogItemType } from '../../model/messenger'

type DialogProps = {
  dialog: DialogItemType
  isActiveChat: boolean
}

export const DialogItem = ({ dialog, isActiveChat }: DialogProps) => {
  return (
    <div className={`${s.wrap}`}>
      <div className={s.avatar}>
        {dialog.avatars.length > 0 && dialog.avatars[0].url ? (
          <Image
            alt={'avatar'}
            className={s.avatar}
            height={30}
            src={dialog.avatars[0].url}
            width={30}
          />
        ) : (
          <div className={s.avatar}>{dialog.userName.slice(0, 2).toUpperCase()}</div>
        )}
      </div>
      <div className={s.content}>
        <div className={s.userNameAndTime}>
          <Typography variant={'body2'}>{dialog.userName}</Typography>
          <Typography className={s.colorGrey} variant={'overline'}>
            {formatDateSmall(dialog.updatedAt)}
          </Typography>
        </div>
        <div className={s.message}>
          <Typography variant={'caption'}>
            <span className={s.colorGrey}>{'Message'}</span>
          </Typography>
        </div>
      </div>
    </div>
  )
}
