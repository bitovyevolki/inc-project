import { Typography } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'

import s from './Sidebar.module.scss'

import { sidebarLinks } from './links'

export const Sidebar = () => {
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
