import { IProfile } from '@/src/entities/profile/userProfile/model/types/profile'
import { Avatar } from '@/src/shared/ui/Avatar/Avatar'
import { formatDateSmall } from '@/src/shared/utils/formatDate'
import { Typography } from '@bitovyevolki/ui-kit-int'
import clsx from 'clsx'

import s from './MessageItem.module.scss'

import { MessageItemType } from '../../model/messenger'

type Props = {
  isMyMessage: boolean
  message: MessageItemType
  partnerData: IProfile
}

const MessageText = ({ isMyMessage, message, partnerData }: Props) => {
  return (
    <div className={clsx(s.messageWithText, { [s.alignRight]: isMyMessage })}>
      {isMyMessage ? (
        <div className={clsx(s.block, { [s.myMessageBackground]: isMyMessage })}>
          <Typography className={s.text} variant={'body2'}>
            {message.messageText}
          </Typography>
          <Typography className={s.time} variant={'caption'}>
            {formatDateSmall(message.updatedAt)}
          </Typography>
        </div>
      ) : (
        <>
          <Avatar
            height={36}
            url={partnerData.avatars[0]?.url}
            userName={partnerData.userName}
            width={36}
          />
          <div className={s.block}>
            <Typography className={s.text} variant={'body2'}>
              {message.messageText}
            </Typography>
            <Typography className={s.time} variant={'caption'}>
              {formatDateSmall(message.updatedAt)}
            </Typography>
          </div>
        </>
      )}
    </div>
  )
}
const MessageImage = ({ message }: Props) => {
  return <div></div>
}

const MessageVoice = ({ message }: Props) => {
  return <div></div>
}

export const MessageItem = ({ ...props }: Props) => {
  if (props.message.messageType === 'TEXT') {
    return <MessageText {...props} />
  }
  if (props.message.messageType === 'IMAGE') {
    return <MessageImage {...props} />
  }
  if (props.message.messageType === 'VOICE') {
    return <MessageVoice {...props} />
  }
}
