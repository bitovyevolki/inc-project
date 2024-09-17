import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Cookies from 'js-cookie'
import { NextIntlClientProvider } from 'next-intl'

import { AppStore } from '../model/store'

type RootProviderProps = {
  children: ReactNode
  pageProps: any
  store: AppStore
}

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

export function RootProvider({ children, pageProps, store }: RootProviderProps) {
  const initialLanguage = Cookies.get('next-language') || 'ru'

  return (
    <NextIntlClientProvider
      locale={initialLanguage}
      messages={pageProps.messages}
      timeZone={'Europe/Moscow'}
    >
      <Provider store={store}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_ID ?? ''}>
          {/* <PayPalScriptProvider
            options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string }}
          > */}
          {/* <Elements stripe={stripePromise}> */}
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
          {/* </Elements> */}
          {/* </PayPalScriptProvider> */}
        </GoogleOAuthProvider>
      </Provider>
    </NextIntlClientProvider>
  )
}
