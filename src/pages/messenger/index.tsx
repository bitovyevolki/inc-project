import { Messenger, SocketProvider } from '@/src/features/messenger'
import { GetServerSideProps } from 'next'

import { NextPageWithLayout } from '../_app'

const MessengerPage: NextPageWithLayout = (props: any) => {
  return (
    <SocketProvider url={'https://inctagram.work'}>
      <Messenger {...props} />
    </SocketProvider>
  )
}

export default MessengerPage

export const getServerSideProps: GetServerSideProps = async context => {
  const locale = context.req.cookies['next-language'] || 'en'
  const messages = (await import(`../../locales/${locale}.json`)).default

  return {
    props: {
      locale,
      messages,
    },
  }
}
