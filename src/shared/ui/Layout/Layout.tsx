import { ReactNode, useState } from 'react'

import { useMeQuery } from '@/src/features/auth/service/auth.service'

import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import { Sidebar } from '../Sidebar/Sidebar'
import { Header } from '../Header/Header'

type Props = {
  children: ReactNode
  withSidebar?: boolean
}

type Language = 'en' | 'ru'

export const Layout = ({ children, withSidebar = false }: Props) => {
  const { data: me } = useMeQuery()
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

  return (
    <>
      <Header
        isAuth={isAuthenticated}
        onLanguageChange={onLanguageChange}
        selectedLanguage={selectedLanguage}
        signInSrc={'/auth/sign-in'}
        signUpSrc={'/auth/sign-up'}
        title={'Inctagram'}
      />
      <main>
        {withSidebar ? (
          <div style={{ display: 'flex' }}>
            <Sidebar />
            {children}
          </div>
        ) : (
          children
        )}
      </main>
    </>
  )
}
