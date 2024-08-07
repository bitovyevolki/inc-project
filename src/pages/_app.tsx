import { ReactElement, ReactNode } from 'react'

import { Header } from '@bitovyevolki/ui-kit-int'
import { NextPage } from 'next'
import { AppProps } from 'next/app'

import '../styles/globals.scss'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <section>
      <Header isAuth onLanguageChange={() => {}} title={'Inctagram'} />
      <main>{getLayout(<Component {...pageProps} />)}</main>
    </section>
  )
}
