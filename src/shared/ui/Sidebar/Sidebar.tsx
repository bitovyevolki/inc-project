import React from 'react'

import { Typography } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'
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
  const t = useTranslations('Sidebar')

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
    <nav className={s.sidebar}>
      {sidebarLinks.map(l => (
        <Link className={s.link} href={l.path} key={l.path}>
          <l.svg />
          <Typography variant={'h4'}>{l.title}</Typography>
        </Link>
      ))}
    </nav>
  )
}
