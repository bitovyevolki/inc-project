import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'

import { wrapper } from '@/src/store'
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

export default function MyApp({ Component, ...rest }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)
  const { props, store } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <section>
        <Header isAuth onLanguageChange={() => {}} title={'Inctagram'} />
        <main>{getLayout(<Component {...props.pageProps} />)}</main>
      </section>
    </Provider>
  )
}
