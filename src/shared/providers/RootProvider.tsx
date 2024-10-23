import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { SocketProvider } from '@/src/features/messenger'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Cookies from 'js-cookie'
import { NextIntlClientProvider } from 'next-intl'

import { AppStore } from '../model/store'

type RootProviderProps = {
  children: ReactNode
  pageProps: any
  store: AppStore
}

export function RootProvider({ children, pageProps, store }: RootProviderProps) {
  const initialLanguage = Cookies.get('next-language') || 'ru'

  return (
    <NextIntlClientProvider
      locale={initialLanguage}
      messages={pageProps.messages}
      timeZone={'Europe/Moscow'}
    >
      <Provider store={store}>
        <SocketProvider url={'https://inctagram.work'}>
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_ID ?? ''}>
            {children}
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
        </SocketProvider>
      </Provider>
    </NextIntlClientProvider>
  )
}
