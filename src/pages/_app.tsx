import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { Header } from '@bitovyevolki/ui-kit-int'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { NextPage } from 'next'
import { AppProps } from 'next/app'

import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'

import { wrapper } from './../shared/model/store'
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
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_ID ?? ''}>
        <section>
          <Header isAuth onLanguageChange={() => {}} title={'Inctagram'} />
          <main>{getLayout(<Component {...props.pageProps} />)}</main>
        </section>
        <ToastContainer
          autoClose={5000}
          closeOnClick
          draggable
          hideProgressBar={false}
          newestOnTop={false}
          pauseOnFocusLoss
          pauseOnHover
          position={'bottom-right'}
          rtl={false}
          theme={'dark'}
        />
      </GoogleOAuthProvider>
    </Provider>
  )
}
