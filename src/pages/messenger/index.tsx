import { ReactElement } from 'react'

import { Messenger } from '@/src/features/messenger'
import { Layout } from '@/src/shared/ui/Layout/Layout'
import { GetServerSideProps } from 'next'

import { NextPageWithLayout } from '../_app'

const MessengerPage: NextPageWithLayout = (props: any) => {
  return <Messenger {...props} />
}

MessengerPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout withSidebar>{page}</Layout>
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
