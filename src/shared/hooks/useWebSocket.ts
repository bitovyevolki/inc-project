import { useEffect, useRef, useState } from 'react'

import { Socket, io } from 'socket.io-client'

const enum MessageStatus {
  READ = 'read',
  RECEIVED = 'received',
  SENT = 'sent',
}

interface MessageType {
  createdAt: string
  id: number
  messageText: string
  ownerId: number
  receiverId: number
  status: MessageStatus
  updatedAt: string
}

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
  const [messages, setMessages] = useState<MessageType[]>([])
  const [error, setError] = useState<null | string>(null)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const socketRef = useRef<Socket | null>(null)

  const connectSocket = () => {
    const accessToken = localStorage.getItem('token')

    const queryParams = {
      query: { accessToken },
      transports: ['websocket', 'polling'],
    }

    const socket = io('https://inctagram.work', queryParams)

    socket.on('connect', () => {
      console.log('WebSocket подключен')
      setIsConnected(true)
    })

    socket.on('disconnect', reason => {
      console.log('WebSocket отключен:', reason)
      setIsConnected(false)
    })

    socket.on(SocketEventPath.RECEIVE_MESSAGE, (message: MessageType) => {
      console.log('Новое сообщение:', message)
      setMessages(prev => [...prev, message])
    })

    socket.on(SocketEventPath.MESSAGE_SENT, (message: MessageType) => {
      console.log('Сообщение отправлено:', message)
      setMessages(prev => [...prev, message])
    })

    socket.on(SocketEventPath.UPDATE_MESSAGE, (updatedMessage: MessageType) => {
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
  }

  const sendMessage = (messageText: string, receiverId: number) => {
    const messageData = {
      message: messageText,
      receiverId,
    }

    if (socketRef.current && isConnected) {
      socketRef.current.emit(SocketEventPath.MESSAGE_SENT, messageData)
      console.log('Сообщение отправлено:', messageData)
    }
  }

  const updateMessage = (message: string, id: number) => {
    const messageData = {
      id,
      message,
    }

    if (socketRef.current && isConnected) {
      socketRef.current.emit(SocketEventPath.UPDATE_MESSAGE, messageData)
      console.log('Сообщение обновлено:', messageData)
    }
  }

  useEffect(() => {
    connectSocket()

    return () => {
      socketRef.current?.disconnect()
    }
  }, [])

  return { error, isConnected, messages, notifications, sendMessage, updateMessage }
}

export default useSocket
