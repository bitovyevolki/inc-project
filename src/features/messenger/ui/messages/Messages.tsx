import { useEffect, useState } from 'react'

import { useGetProfileByIdQuery } from '@/src/entities/profile/userProfile/api/profile.service'
import { Avatar } from '@/src/shared/ui/Avatar/Avatar'
import { Button, Typography } from '@bitovyevolki/ui-kit-int'

import s from './Messages.module.scss'

import { useSocket } from '../../lib/useSocket'
import { MessageItemType, WBEventPath } from '../../model/messenger'
import { useGetMessagesByUserIdQuery } from '../../model/messenger.service'
import { MessageItem } from '../message-item/MessageItem'
import { SendMessageForm } from '../send-message-form/SendMessageForm'

type MessagesProps = {
  partnerId: number
}

export const Messages = ({ partnerId }: MessagesProps) => {
  const [messages, setMessages] = useState<MessageItemType[]>([])

  const { data } = useGetMessagesByUserIdQuery({ dialoguePartnerId: partnerId })
  const { data: partnerData, isLoading: isLoadingUserData } = useGetProfileByIdQuery({
    profileId: partnerId,
  })

  const socket = useSocket()

  useEffect(() => {
    if (socket) {
      socket.on(WBEventPath.RECEIVE_MESSAGE, (data: MessageItemType) => {
        setMessages(prev => [data, ...prev])
      })
    }
  }, [])

  useEffect(() => {
    setMessages([])
  }, [partnerId])

  useEffect(() => {
    if (data) {
      setMessages(prev => [...prev, ...data.items])
    }
  }, [data])

  if (!partnerData) {
    return
  }

  return (
    <div className={s.wrapper}>
      <div className={s.topBlock}>
        {partnerData && partnerData.avatars ? (
          <>
            <Avatar
              height={48}
              url={partnerData.avatars[0]?.url}
              userName={partnerData.userName}
              width={48}
            />
            <Typography variant={'body1'}>{partnerData.userName}</Typography>
          </>
        ) : (
          <>Чат не выбран</>
        )}
      </div>
      <div className={s.messages}>
        {partnerId ? (
          <>
            <div className={s.messagesList}>
              {messages.map(m => {
                const isMyMessage = partnerId === m.receiverId

                return (
                  <MessageItem
                    isMyMessage={isMyMessage}
                    key={m.id}
                    message={m}
                    partnerData={partnerData}
                  />
                )
              })}
            </div>
            <SendMessageForm />
          </>
        ) : (
          <div>
            <Button variant={'secondary'}>Выберите чат</Button>
          </div>
        )}
      </div>
    </div>
  )
}
