import { useState } from 'react'

import { Loader } from '@/src/shared/ui/loader/Loader'
import { Card, Typography } from '@bitovyevolki/ui-kit-int'

import s from './notification.module.scss'

import { useGetNotificationsByProfileQuery } from '../api/profile-notifications'

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

  // Функция для рендеринга уведомлений
  const renderNotifications = () => {
    if (isLoading) {
      return <Loader />
    }
    if (error) {
      return <p>Error loading notifications</p>
    }
    if (!data || !data.items.length) {
      return <p>No notifications found</p>
    }

    return (
      <ul>
        {data.items.map(notification => (
          <div className={s.notWrap} key={notification.id}>
            <div>
              <div className={s.newNot}>
                <Typography variant={'body2'}>Новое уведомеление!</Typography>
                <Typography variant={'caption'}>
                  {notification.isRead ? null : <div className={s.newText}>Новое</div>}
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
      <Typography variant={'body1'}>Уведомеления</Typography>
      <hr className={s.line} />
      {renderNotifications()}
    </Card>
  )
}
