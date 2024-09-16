import { useState } from 'react'

import { Notifications } from '@/src/features/notifications'
import { Button, IOption, Select, Typography } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'

import s from './header.module.scss'

import { BellIcon, FlagRussia, FlagUnitedKingdom } from '../../assets/icons'

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

  const handlerShowNotifications = () => {
    setShowNotifications(!showNotifications)
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
          <div className={s.notWrap}>
            <span className={s.notSpan}>3</span>
            <Button className={s.btn} onClick={handlerShowNotifications} variant={'ghost'}>
              <BellIcon />
            </Button>
          </div>
        ) : (
          <BellIcon onClick={handlerShowNotifications} />
        )}

        <Select
          // onValueChange={onLanguageChange}
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
          // onValueChange={onLanguageChange}
          onChange={onLanguageChange}
          options={options}
          value={selectedLanguage || 'ru'}
          variant={'large'}
        />

        <Typography as={'a'} className={s.loginButton} href={signInSrc} variant={'link1'}>
          {'Login'}
        </Typography>
        <Button as={'a'} href={signUpSrc} variant={'primary'}>
          {'Sing Up'}
        </Button>
      </div>
    </div>
  )
}
