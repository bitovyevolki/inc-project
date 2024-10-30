import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { useGetProfileByIdQuery } from '@/src/entities/profile/userProfile/api/profile.service'
import { Avatar } from '@/src/shared/ui/Avatar/Avatar'
import { RoundLoader } from '@/src/shared/ui/RoundLoader/RoundLoader'
import { Typography } from '@bitovyevolki/ui-kit-int'
import { useRouter } from 'next/router'

import s from './Messages.module.scss'

import { MessageItemType } from '../../model/messenger'
import {
  useGetMessagesByUserIdQuery,
  useUpdateMessagesStatusMutation,
} from '../../model/messenger.service'
import { MessageItem } from '../message-item/MessageItem'
import { SendMessageForm } from '../send-message-form/SendMessageForm'

type MessagesProps = {
  messagesSocket: MessageItemType[]
  myId: number
  partnerId: number
}

export const Messages = ({ messagesSocket, myId, partnerId }: MessagesProps) => {
  const [messages, setMessages] = useState<MessageItemType[]>([])
  const [filtredMessagesSocket, setFiltredMessagesSocket] = useState<MessageItemType[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [cursor, setCursor] = useState<number | undefined>()
  const { inView, ref } = useInView()
  const router = useRouter()

  const [updateMessagesStatus] = useUpdateMessagesStatusMutation()
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  const {
    data,
    isFetching: isFetchingMessages,
    refetch,
  } = useGetMessagesByUserIdQuery({
    cursor,
    dialoguePartnerId: partnerId,
  })
  const { data: partnerData } = useGetProfileByIdQuery({
    profileId: partnerId,
  })

  useEffect(() => {
    setMessages([])
    setFiltredMessagesSocket([])
    setIsFirstLoad(true)
    refetch()
  }, [partnerId, refetch])

  useEffect(() => {
    const newMessages = messagesSocket.filter(
      el => el.ownerId === partnerId || el.receiverId === partnerId
    )

    if (newMessages.length > 0) {
      setFiltredMessagesSocket(newMessages)
    }
  }, [messagesSocket, partnerId])

  useEffect(() => {
    if (data) {
      if (isFirstLoad) {
        const newMessages = [...data.items]

        setMessages(newMessages)
        setIsFirstLoad(false)
      } else {
        setMessages(prev => {
          const uniqueMessages = data.items.filter(
            item => !prev.some(prevMsg => prevMsg.id === item.id)
          )

          return [...prev, ...uniqueMessages]
        })
      }

      setTotalCount(data.totalCount)

      const messagesForUpdateStatus = data.items
        .filter(el => el.ownerId !== myId && el.status !== 'READ')
        .map(el => el.id)

      if (messagesForUpdateStatus.length > 0) {
        updateMessagesStatus({ ids: messagesForUpdateStatus })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (inView) {
      setCursor(messages[messages.length - 1]?.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <div className={s.wrapper}>
      <div className={s.topBlock}>
        {partnerData && partnerData.avatars && (
          <div
            className={s.linkToProfile}
            onClick={() => router.push(`/profile/${partnerData.id}`)}
          >
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
              {filtredMessagesSocket.map(m => {
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
              {isFetchingMessages && (
                <div className={s.loader}>
                  <RoundLoader variant={'small'} />
                </div>
              )}
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
