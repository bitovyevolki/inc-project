import { useEffect, useState } from 'react'

import { useParamsHook } from '@/src/shared/hooks/useParamsHook'
import { Typography } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'

import s from './Messenger.module.scss'

import { useMeQuery } from '../../auth/service/auth.service'
import { useSocket } from '../lib/useSocket'
import { MessageItemType, WBEventPath } from '../model/messenger'
import { Dialogs } from './dialogs/Dialogs'
import { Messages } from './messages/Messages'

export const Messenger = () => {
  const t = useTranslations('Messenger')
  const { changeQueryHandler, searchParams } = useParamsHook()
  const partnerId = searchParams.get('partnerId')
  const { data } = useMeQuery()

  const [newMessagesSocket, setNewMessagesSocket] = useState<MessageItemType[]>([])

  const socket = useSocket()

  useEffect(() => {
    setNewMessagesSocket([])
  }, [partnerId])

  const handleMessage = (message: MessageItemType) => {
    setNewMessagesSocket(prev => {
      const hasNewMessage = prev.some(el => el.id === message.id)

      return hasNewMessage ? prev : [message, ...prev]
    })
  }

  useEffect(() => {
    socket?.on(WBEventPath.RECEIVE_MESSAGE, (message: MessageItemType) => {
      handleMessage(message)
    })

    socket?.on(WBEventPath.MESSAGE_SENT, (message: MessageItemType, acknowledge) => {
      handleMessage(message)
      acknowledge({ message: { ...message, status: 'RECEIVED' }, receiverId: message.ownerId })
    })
  }, [socket, partnerId])

  useEffect(() => {
    changeQueryHandler({ partnerId: `${partnerId}` })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!data) {
    return
  }

  return (
    <div className={s.wrapper}>
      <Typography variant={'h2'}>{'Messenger'}</Typography>
      <div className={s.container}>
        <Dialogs
          messagesSocket={newMessagesSocket}
          myId={data.userId}
          partnerId={Number(partnerId)}
          setNewMessagesSocket={setNewMessagesSocket}
        />

        <Messages
          messagesSocket={newMessagesSocket}
          myId={data.userId}
          partnerId={Number(partnerId)}
        />
      </div>
    </div>
  )
}
