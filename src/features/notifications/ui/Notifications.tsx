import { useEffect, useState } from 'react'

import { Card, Typography } from '@bitovyevolki/ui-kit-int'

import s from './notification.module.scss'

import {
  useGetNotificationsByProfileQuery,
  useMarkNotificationsAsReadMutation,
} from '../api/profile-notifications'
import { INotificationItem } from '../models/notifications'
import { ShowNotifications } from './ShowNotifications'

interface MarkAsReadResponse {
  error?: string
  messages?: { field: string; message: string }[]
  statusCode: number
}

export const Notifications = () => {
  const [cursor, setCursor] = useState('') // Установите начальный курсор
  const { data, error, isLoading, refetch } = useGetNotificationsByProfileQuery({ cursor })
  const [unreadCount, setUnreadCount] = useState(0)
  const [markAsRead] = useMarkNotificationsAsReadMutation<MarkAsReadResponse>()
  const [notifications, setNotifications] = useState<INotificationItem[]>([]) // Инициализация состояния с правильным типом

  // Обновление уведомлений при изменении данных
  useEffect(() => {
    if (data) {
      const unread = data.items.filter(
        (notification: INotificationItem) => !notification.isRead
      ).length

      setUnreadCount(unread)
      setNotifications(data.items) // Обновляем уведомления сразу при получении данных
    }
  }, [data]) // Обновляем при каждом изменении data

  const handleNotificationClick = async (notificationId: number) => {
    try {
      // Отметить уведомление как прочитанное на сервере
      await markAsRead({ ids: [notificationId] })
      refetch()
      // Обновить локальное состояние после успешного запроса
      const updatedNotifications = notifications.map(notification =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification
      )

      setNotifications(updatedNotifications)
      console.log('Notification marked as read successfully.')
    } catch (error) {
      // Обработка возможных ошибок
      if (error.status === 400) {
        console.error('Bad request: Invalid input', error)
      } else {
        console.error('Failed to mark notification as read:', error)
      }
    }
  }

  return (
    <Card className={s.card}>
      <Typography variant={'body1'}>Уведомления</Typography>
      <hr className={s.line} />
      <ShowNotifications
        error={error}
        handleNotificationClick={handleNotificationClick}
        isLoading={isLoading}
        notifications={notifications}
      />
    </Card>
  )
}
