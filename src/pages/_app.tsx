import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { Provider } from 'react-redux'

import { Header } from '@bitovyevolki/ui-kit-int'
import Cookies from 'js-cookie'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { NextIntlClientProvider } from 'next-intl'

import '../styles/globals.scss'

import { wrapper } from './../shared/model/store'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function MyApp({ Component, pageProps, ...rest }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)
  const { props, store } = wrapper.useWrappedStore(rest)
  const router = useRouter()

  const initialLanguage = Cookies.get('next-language') || 'ru'
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ru'>(
    initialLanguage as 'en' | 'ru'
  )

  const onLanguageChange = (lang: string) => {
    if (lang === 'en' || lang === 'ru') {
      setSelectedLanguage(lang)
      Cookies.set('next-language', lang)
      router.reload()
    }
  }

  return (
    <NextIntlClientProvider locale={selectedLanguage} messages={pageProps.messages}>
      <Provider store={store}>
        <section>
          <Header
            isAuth
            onLanguageChange={onLanguageChange}
            selectedLanguage={selectedLanguage}
            title={'Inctagram'}
          />
          <main>{getLayout(<Component {...pageProps} />)}</main>
        </section>
      </Provider>
    </NextIntlClientProvider>
  )
}
