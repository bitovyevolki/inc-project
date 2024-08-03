import { Header } from '@bitovyevolki/ui-kit-int'
import { AppProps } from 'next/app'

import '../styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <section>
      <header>
        <Header isAuth onLanguageChange={() => {}} title={'Inctagram'} />
      </header>

      <main>
        <Component {...pageProps} />
      </main>
    </section>
  )
}
