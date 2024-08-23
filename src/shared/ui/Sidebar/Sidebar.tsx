import React, { useState } from 'react'
import { toast } from 'react-toastify'

import { useLogOutMutation } from '@/src/features/auth/service/auth.service'
import { RoundLoader } from '@/src/shared/ui/RoundLoader/RoundLoader'
import { LogoutIcon } from '@/src/shared/ui/Sidebar/Icons'
import { Button, ModalWindow, Typography } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

import s from './Sidebar.module.scss'

import { RouterPaths } from '../../config/router.paths'
import {
  CreateIcon,
  FavoritesIcon,
  HomeIcon,
  MessengerIcon,
  MyProfileIcon,
  SearchIcon,
  StatisticsIcon,
} from './Icons'

interface ILink {
  path: string
  svg: () => React.JSX.Element
  title: string
}

export const Sidebar = () => {
  const [logOut, { isLoading }] = useLogOutMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  const onLogout = () => {
    logOut()
      .unwrap()
      .then(() => {
        setIsModalOpen(false)
        void router.push(RouterPaths.SIGN_IN)
      })
      .catch((err: Error) => {
        toast.error(err.message)
      })
  }
  const t = useTranslations('Sidebar')

  if (isLoading) {
    return <RoundLoader variant={'large'} />
  }

  const sidebarLinks: ILink[] = [
    { path: RouterPaths.HOME, svg: HomeIcon, title: t('home') },
    { path: RouterPaths.HOME, svg: CreateIcon, title: t('create') },
    { path: RouterPaths.HOME, svg: MyProfileIcon, title: t('my-profile') },
    { path: RouterPaths.HOME, svg: MessengerIcon, title: t('messenger') },
    { path: RouterPaths.HOME, svg: SearchIcon, title: t('search') },
    { path: RouterPaths.HOME, svg: StatisticsIcon, title: t('statistics') },
    { path: RouterPaths.HOME, svg: FavoritesIcon, title: t('favorites') },
  ]

  return (
    <>
      {isModalOpen && (
        <ModalWindow
          onOpenChange={() => setIsModalOpen(false)}
          open={isModalOpen}
          title={'Confirm log out'}
        >
          <div className={s.card}>
            <Typography as={'p'} variant={'body1'}>
              Do you really want to log out of your account?
            </Typography>
            <div className={s.buttonsContainer}>
              <Button onClick={onLogout}>Yes</Button>
              <Button onClick={() => setIsModalOpen(false)}>No</Button>
            </div>
          </div>
        </ModalWindow>
      )}
      <nav className={s.sidebar}>
        {sidebarLinks.map((l, ind) => (
          <Link className={s.link} href={l.path} key={l.path + '-' + ind}>
            <l.svg />
            <Typography variant={'h4'}>{l.title}</Typography>
          </Link>
        ))}
        <Button className={s.buttonLogout} onClick={() => setIsModalOpen(true)} variant={'ghost'}>
          <LogoutIcon />
          <Typography as={'p'} variant={'h4'}>
            Log Out
          </Typography>
        </Button>
      </nav>
    </>
  )
}
