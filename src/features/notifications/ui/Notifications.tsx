import { useEffect, useState } from 'react'

import { Button, Card, Typography } from '@bitovyevolki/ui-kit-int'

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
      await markAsRead({ ids: [notificationId] })
      refetch()

      const updatedNotifications = notifications.map(notification =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification
      )

      setNotifications(updatedNotifications)
      console.log('Notification marked as read successfully.')
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'status' in error) {
        const err = error as { status: number; message?: string }
        if (err.status === 400) {
          console.error('Bad request: Invalid input', err)
        } else {
          console.error('Failed to mark notification as read:', err)
        }
      } else {
        console.error('Unexpected error:', error)
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
