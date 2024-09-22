import { Loader } from '@/src/shared/ui/loader/Loader'
import { Typography } from '@bitovyevolki/ui-kit-int'

import s from './notification.module.scss'

import { INotificationItem } from '../models/notifications'

interface ShowNotificationsProps {
  error: any
  handleNotificationClick: (notificationId: number) => void
  isLoading: boolean
  notifications: INotificationItem[]
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

export const ShowNotifications = ({
  error,
  handleNotificationClick,
  isLoading,
  notifications,
}: ShowNotificationsProps) => {
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
