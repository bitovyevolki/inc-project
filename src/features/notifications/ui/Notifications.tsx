import { Card, Typography } from '@bitovyevolki/ui-kit-int'
import { useState } from 'react'
import { useGetNotificationsByProfileQuery } from '../api/profile-notifications'
import s from './notification.module.scss'

// Функция для форматирования даты
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const Notifications = () => {
  const [cursor, setCursor] = useState('') // Установите начальный курсор
  const { data, error, isLoading } = useGetNotificationsByProfileQuery({ cursor })

  // Функция для рендеринга уведомлений
  const renderNotifications = () => {
    if (isLoading) return <p>Loading notifications...</p>
    if (error) return <p>Error loading notifications</p>
    if (!data || !data.items.length) return <p>No notifications found</p>

    return (
      <ul>
        {data.items.map(notification => (
          <div className={s.notWrap}>
            <div key={notification.id}>
              <div className={s.newNot}>
                <Typography variant={'body2'}>Новое уведомеление!</Typography>
                <Typography variant={'caption'} className={s.newText}>
                  {notification.isRead ? null : 'Новое'!}
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
