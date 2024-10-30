import { useEffect, useState } from 'react'

import { MessageIcon } from '@/src/shared/assets/icons'
import { formatDateSmall } from '@/src/shared/utils/formatDate'
import { Typography } from '@bitovyevolki/ui-kit-int'
import clsx from 'clsx'
import Image from 'next/image'

import s from './dialogItem.module.scss'

import { DialogItemType, MessageItemType } from '../../model/messenger'

type DialogProps = {
  dialog: DialogItemType
  isActiveChat: boolean
  myId: number
}

export const DialogItem = ({ dialog, isActiveChat, myId }: DialogProps) => {
  const [text, setText] = useState('')
  const [messageDate, setMessageDate] = useState<string>('')

  useEffect(() => {
    setText(dialog.messageText)
    setMessageDate(dialog.createdAt)
  }, [dialog])

  const userName =
    dialog.userName.length > 12 ? dialog.userName.slice(0, 12) + '...' : dialog.userName

  return (
    <div
      className={clsx(s.wrap, {
        [s.haveNewMessage]: dialog.status !== 'READ' && dialog.ownerId !== myId,
      })}
    >
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
          <div className={s.avatar}>{userName.slice(0, 2).toUpperCase()}</div>
        )}
      </div>
      <div className={s.content}>
        <div className={s.userNameAndTime}>
          <Typography variant={'body2'}>{userName}</Typography>
          <Typography className={s.colorGrey} variant={'overline'}>
            {formatDateSmall(messageDate)}
          </Typography>
        </div>
        <div className={s.message}>
          <Typography variant={'caption'}>
            <span className={s.colorGrey}>
              {text.length < 30 ? text : `${text.slice(0, 30)}...`}
            </span>
          </Typography>
        </div>
      </div>
    </div>
  )
}
