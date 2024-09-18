import { useEffect, useState } from 'react'

import { Loader } from '@/src/shared/ui/loader/Loader'
import { Card, Typography } from '@bitovyevolki/ui-kit-int'

import s from './notification.module.scss'

import {
  useGetNotificationsByProfileQuery,
  useMarkNotificationsAsReadMutation,
} from '../api/profile-notifications'

// Определение интерфейса для уведомлений
interface Notification {
  id: number
  isRead: boolean
  message: string
  notifyAt: string
}

// Функция для форматирования даты
const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export const Notifications = () => {
  const [cursor, setCursor] = useState('') // Установите начальный курсор
  const { data, error, isLoading } = useGetNotificationsByProfileQuery({ cursor })
  const [unreadCount, setUnreadCount] = useState(0)
  const [markAsRead] = useMarkNotificationsAsReadMutation()
  const [notifications, setNotifications] = useState<Notification[]>([]) // Инициализация состояния с правильным типом

  // Обновление уведомлений при изменении данных
  useEffect(() => {
    if (data) {
      const unread = data.items.filter((notification: Notification) => !notification.isRead).length

      setUnreadCount(unread)
      setNotifications(data.items) // Обновляем уведомления сразу при получении данных
    }
  }, [data]) // Обновляем при каждом изменении data

  const handleNotificationClick = async (notificationId: number) => {
    try {
      // Отметить уведомление как прочитанное на сервере
      await markAsRead({ ids: [notificationId] }).unwrap()

      // Обновить локальное состояние, чтобы пометить уведомление как прочитанное
      const updatedNotifications = notifications.map(notification =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification
      )

      // Обновить состояние с новыми данными
      setNotifications(updatedNotifications)
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
    }
  }

  // Функция для рендеринга уведомлений
  const renderNotifications = () => {
    if (isLoading) {
      return <Loader />
    }
    if (error) {
      return <p>Error loading notifications</p>
    }
    if (!notifications.length) {
      return <p>No notifications found</p>
    }

    return (
      <ul>
        {notifications.map(notification => (
          <div
            className={s.notWrap}
            key={notification.id}
            onClick={() => handleNotificationClick(notification.id)}
          >
            <div>
              <div className={s.newNot}>
                <Typography variant={'body2'}>Новое уведомление!</Typography>
                <Typography variant={'caption'}>
                  {!notification.isRead && <span className={s.newText}>Новое</span>}
                </Typography>
              </div>
              <div className={s.notBody}>
                <Typography variant={'caption'}>{notification.message}</Typography>
                <Typography variant={'caption'}>{formatDate(notification.notifyAt)}</Typography>
              </div>
            </div>
            <hr className={s.line} />
          </div>
        ))}
      </ul>
    )
  }

  return (
    <Card className={s.card}>
      <Typography variant={'body1'}>Уведомления</Typography>
      <hr className={s.line} />
      {renderNotifications()}
    </Card>
  )
}
