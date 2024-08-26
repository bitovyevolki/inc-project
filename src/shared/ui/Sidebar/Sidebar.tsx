import React, { useState } from 'react'

import { useLogOutMutation, useMeQuery } from '@/src/features/auth/service/auth.service'
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  const { data: meData, isLoading: LoadingMe } = useMeQuery()
  const [logOut] = useLogOutMutation()

  const t = useTranslations('Sidebar')

  const sidebarLinks: ILink[] = [
    { path: RouterPaths.HOME, svg: HomeIcon, title: t('home') },
    { path: RouterPaths.CREATE_POST, svg: CreateIcon, title: t('create') },
    {
      path: `${RouterPaths.MY_PROFILE}/${meData?.userId}`,
      svg: MyProfileIcon,
      title: t('my-profile'),
    },
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
              <Button onClick={() => logOut()}>Yes</Button>
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
