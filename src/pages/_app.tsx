import { ReactElement, ReactNode } from 'react'

import { NextPage } from 'next'
import { AppProps } from 'next/app'

import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.scss'

import { RootProvider } from '../shared/providers/RootProvider'
import { Layout } from '../shared/ui/Layout/Layout'
import { wrapper } from './../shared/model/store'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function MyApp({ Component, pageProps, ...rest }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>)
  const { props, store } = wrapper.useWrappedStore(rest)

  return (
    <RootProvider pageProps={pageProps} store={store}>
      {getLayout(<Component {...pageProps} />)}
    </RootProvider>
  )
}
