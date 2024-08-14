import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { Provider } from 'react-redux'

import { Header } from '@bitovyevolki/ui-kit-int'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'

import '../styles/globals.scss'

import i18n from '../i18n'
import { wrapper } from './../shared/model/store'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

function MyApp({ Component, ...rest }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)
  const { props, store } = wrapper.useWrappedStore(rest)

  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ru'>('en')

  useEffect(() => {
    setSelectedLanguage(i18n.language as 'en' | 'ru')
  }, [])

  const onLanguageChange = (lang: string) => {
    console.log(i18n.t('welcome'))
    if (lang === 'en' || lang === 'ru') {
      setSelectedLanguage(lang)
      i18n.changeLanguage(lang)
    }
  }

  return (
    <Provider store={store}>
      <section>
        <Header
          isAuth
          onLanguageChange={onLanguageChange}
          selectedLanguage={selectedLanguage}
          title={'Inctagram'}
        />
        <main>{getLayout(<Component {...props.pageProps} />)}</main>
      </section>
    </Provider>
  )
}

export default appWithTranslation(MyApp)
