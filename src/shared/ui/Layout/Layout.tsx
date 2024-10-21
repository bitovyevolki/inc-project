import { ReactNode, useState } from 'react'

import { useMeQuery } from '@/src/features/auth/service/auth.service'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import s from './Layout.module.scss'

import { RouterPaths } from '../../config/router.paths'
import { Header } from '../Header/Header'
import { RoundLoader } from '../RoundLoader/RoundLoader'
import { Sidebar } from '../Sidebar/Sidebar'

type Props = {
  children: ReactNode
}

type Language = 'en' | 'ru'

export const Layout = ({ children }: Props) => {
  const { data: me, isLoading } = useMeQuery()
  const isAuthenticated = !!me
  const router = useRouter()
  const initialLanguage = Cookies.get('next-language') || 'ru'
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(initialLanguage as Language)

  const onLanguageChange = (lang: string) => {
    if (lang === 'en' || lang === 'ru') {
      setSelectedLanguage(lang)
      Cookies.set('next-language', lang)
      router.reload()
    }
  }

  if (isLoading) {
    return (
      <div className={s.loader}>
        <RoundLoader variant={'large'} />
      </div>
    )
  }

  return (
    <div className={s.root}>
      <Header
        isAuth={isAuthenticated}
        onLanguageChange={onLanguageChange}
        selectedLanguage={selectedLanguage}
        signInSrc={RouterPaths.SIGN_IN}
        signUpSrc={RouterPaths.SIGN_UP}
        title={'Inctagram'}
      />
      <main className={s.mainLayout}>
        {isAuthenticated ? (
          <div className={s.withSidebarLayout}>
            <Sidebar userId={me.userId} />
            <div className={s.withSidebarContent}>{children}</div>
          </div>
        ) : (
          <div className={s.withoutSidebarContent}>{children}</div>
        )}
      </main>
    </div>
  )
}
