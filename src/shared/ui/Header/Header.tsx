import { useState, useEffect } from 'react'
import { Notifications } from '@/src/features/notifications'
import { Button, IOption, Select, Typography } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'

import s from './header.module.scss'
import { BellIcon, FlagRussia, FlagUnitedKingdom } from '../../assets/icons'
import {
  useGetNotificationsByProfileQuery,
  useMarkNotificationsAsReadMutation,
} from '@/src/features/notifications/api/profile-notifications'

export type LanguageType = 'en' | 'ru'

export type HeaderProps = {
  isAuth: boolean
  onLanguageChange: (value: string) => void
  selectedLanguage?: LanguageType
  signInSrc?: string
  signUpSrc?: string
  title: string
}

const options: IOption[] = [
  {
    label: (
      <div className={s.selectItem}>
        <FlagRussia height={20} width={20} />
        <Typography variant={'body1'}>{'Russian'}</Typography>
      </div>
    ),
    value: 'ru',
  },
  {
    label: (
      <div className={s.selectItem}>
        <FlagUnitedKingdom height={20} width={20} />
        <Typography variant={'body1'}>{'English'}</Typography>
      </div>
    ),
    value: 'en',
  },
]

export const Header = ({
  isAuth,
  onLanguageChange,
  selectedLanguage,
  signInSrc,
  signUpSrc,
  title,
}: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [markAsRead] = useMarkNotificationsAsReadMutation()
  const { data: notificationsData, isLoading } = useGetNotificationsByProfileQuery({ cursor: '' })

  useEffect(() => {
    if (notificationsData) {
      const unread = notificationsData.items.filter(notification => !notification.isRead).length
      setUnreadCount(unread)
    }
  }, [notificationsData])

  const handlerShowNotifications = async () => {
    setShowNotifications(!showNotifications)

    if (!showNotifications && unreadCount > 0) {
      // Помечаем все уведомления как прочитанные
      const unreadIds = notificationsData?.items
        .filter(notification => !notification.isRead)
        .map(n => n.id)
      if (unreadIds && unreadIds.length > 0) {
        await markAsRead({ ids: unreadIds })
        setUnreadCount(0) // Скрываем индикатор
      }
    }
  }

  return isAuth ? (
    <div className={s.header}>
      <Link className={s.nounderline} href={'/'}>
        <Typography variant={'h1'}>{title}</Typography>
      </Link>
      <div className={s.actions}>
        <div>
          <div>{showNotifications ? <Notifications /> : null}</div>
        </div>
        {showNotifications ? (
          <Button
            className={s.bellBtn}
            style={{ padding: 0 }}
            onClick={handlerShowNotifications}
            variant={'ghost'}
          >
            <BellIcon />
          </Button>
        ) : (
          <div className={s.notWrap}>
            {unreadCount > 0 && <span className={s.notSpan}>{unreadCount}</span>}
            <div onClick={handlerShowNotifications} className={s.btn}>
              <BellIcon />
            </div>
          </div>
        )}

        <Select
          onChange={onLanguageChange}
          options={options}
          value={selectedLanguage || 'ru'}
          variant={'large'}
        />
      </div>
    </div>
  ) : (
    <div className={s.header}>
      <Typography variant={'h1'}>{title}</Typography>
      <div className={s.actions}>
        <Select
          onChange={onLanguageChange}
          options={options}
          value={selectedLanguage || 'ru'}
          variant={'large'}
        />
        <Typography as={'a'} className={s.loginButton} href={signInSrc} variant={'link1'}>
          {'Login'}
        </Typography>
        <Button as={'a'} href={signUpSrc} variant={'primary'}>
          {'Sign Up'}
        </Button>
      </div>
    </div>
  )
}
