import { useEffect, useRef, useState } from 'react'

import { MessageItemType } from '@/src/features/messenger/model/messenger'
import { Socket, io } from 'socket.io-client'

interface NotificationType {
  clientId: string
  id: number
  isRead: boolean
  message: string
  notifyAt: string
}

const enum SocketEventPath {
  ERROR = 'error',
  MESSAGE_DELETED = 'message-deleted',
  MESSAGE_SENT = 'message-sent',
  NOTIFICATIONS = 'notifications',
  RECEIVE_MESSAGE = 'receive-message',
  UPDATE_MESSAGE = 'update-message',
}

const useSocket = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([])
  const [messages, setMessages] = useState<MessageItemType[]>([])
  const [error, setError] = useState<null | string>(null)
  const [isConnected, setIsConnected] = useState<boolean>(false)

  const accessToken = localStorage.getItem('token')

  const queryParams = {
    query: { accessToken },
    transports: ['websocket', 'polling'],
  }

  const socket = io('https://inctagram.work', queryParams)

  useEffect(() => {
    socket.on('connect', () => {
      console.log('WebSocket подключен')
      setIsConnected(true)
    })

    socket.on('disconnect', reason => {
      console.log('WebSocket отключен:', reason)
      setIsConnected(false)
    })

    socket.on(SocketEventPath.RECEIVE_MESSAGE, (message: MessageItemType) => {
      console.log('Новое сообщение:', message)
      setMessages(prev => [...prev, message])
    })

    socket.on(SocketEventPath.MESSAGE_SENT, (message: MessageItemType) => {
      console.log('Сообщение отправлено:', message)
      setMessages(prev => [...prev, message])
    })

    socket.on(SocketEventPath.UPDATE_MESSAGE, (updatedMessage: MessageItemType) => {
      console.log('Сообщение обновлено:', updatedMessage)
      setMessages(prev =>
        prev.map(message => (message.id === updatedMessage.id ? updatedMessage : message))
      )
    })

    socket.on(SocketEventPath.MESSAGE_DELETED, (deletedMessageId: number) => {
      console.log('Сообщение удалено:', deletedMessageId)
      setMessages(prev => prev.filter(message => message.id !== deletedMessageId))
    })

    socket.on(SocketEventPath.NOTIFICATIONS, (notification: NotificationType) => {
      console.log('Новое уведомление:', notification)
      setNotifications(prev => [...prev, notification])
    })

    socket.on(SocketEventPath.ERROR, (errorData: { message: string }) => {
      console.error('Ошибка:', errorData.message)
      setError(errorData.message)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return { error, isConnected, messages, notifications }
}

export default useSocket
