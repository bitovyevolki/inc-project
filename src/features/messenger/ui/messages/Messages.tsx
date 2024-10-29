import { useEffect, useState } from 'react'

import { useGetProfileByIdQuery } from '@/src/entities/profile/userProfile/api/profile.service'
import { Avatar } from '@/src/shared/ui/Avatar/Avatar'
import { Typography } from '@bitovyevolki/ui-kit-int'

import s from './Messages.module.scss'

import { RoundLoader } from '@/src/shared/ui/RoundLoader/RoundLoader'
import { useInView } from 'react-intersection-observer'
import { useSocket } from '../../lib/useSocket'
import { MessageItemType, WBEventPath } from '../../model/messenger'
import { useGetMessagesByUserIdQuery } from '../../model/messenger.service'
import { MessageItem } from '../message-item/MessageItem'
import { SendMessageForm } from '../send-message-form/SendMessageForm'
import Link from 'next/link'
import { useRouter } from 'next/router'

type MessagesProps = {
  partnerId: number
}

export const Messages = ({ partnerId }: MessagesProps) => {
  const [messages, setMessages] = useState<MessageItemType[]>([])
	const [totalCount, setTotalCount] = useState(0)
  const [cursor, setCursor] = useState<number | undefined>()
  const { ref, inView } = useInView()
	const router = useRouter()

  const { data, isFetching: isFetchingMessages } = useGetMessagesByUserIdQuery({ cursor, dialoguePartnerId: partnerId })
  const { data: partnerData } = useGetProfileByIdQuery({
    profileId: partnerId,
  })

  const socket = useSocket()

	

  useEffect(() => {
    socket?.on(WBEventPath.RECEIVE_MESSAGE, (data: MessageItemType) => {
      setMessages(prev => [data, ...prev])
    })

    socket?.on(WBEventPath.MESSAGE_SENT, (message: MessageItemType, acknowledge) => {
      setMessages(prev => [message, ...prev])
			console.log(message)
			acknowledge({ message, receiverId: message.receiverId })
    })
  }, [socket, partnerId])

  useEffect(() => {
    setMessages([])
  }, [partnerId])

  useEffect(() => {
    if (data) {
      setMessages(prev => [...prev, ...data.items])
			setTotalCount(data?.totalCount)
    }
  }, [data])

	  useEffect(() => {
    if (inView) {
      setCursor(messages[messages.length - 1]?.id)
    }
  }, [inView])

  return (
    <div className={s.wrapper}>
      <div className={s.topBlock}>
        {partnerData && partnerData.avatars && (
          <div className={s.linkToProfile} onClick={()=> router.push(`/profile/${partnerData.id}`)}>
            <Avatar
              height={48}
              url={partnerData.avatars[0]?.url}
              userName={partnerData.userName}
              width={48}
            />
            <Typography variant={'body1'}>{partnerData.userName}</Typography>
          </div>
        )}
      </div>
      <div className={s.messages}>
        {partnerId && partnerData ? (
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
							{messages.length < totalCount && <div ref={ref}></div>}
							{isFetchingMessages && <div className={s.loader}><RoundLoader variant={'small'} /></div>}
            </div>
            <SendMessageForm receiverId={partnerId} />
          </>
        ) : (
          <Typography className={s.emptyChat} variant={'body2'}>
            Выберите чат
          </Typography>
        )}
      </div>
    </div>
  )
}
