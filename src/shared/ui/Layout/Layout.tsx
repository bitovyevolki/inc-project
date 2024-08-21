import { ReactNode, useState } from 'react'

import { Header } from '@bitovyevolki/ui-kit-int'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import { Sidebar } from '../Sidebar/Sidebar'

type Props = {
  children: ReactNode
  withSidebar?: boolean
}

type Language = 'en' | 'ru'

export const Layout = ({ children, withSidebar = false }: Props) => {
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
        isAuth
        onLanguageChange={onLanguageChange}
        selectedLanguage={selectedLanguage}
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
