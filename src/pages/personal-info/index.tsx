import { ReactElement } from 'react'

import { Profile } from '@/src/entities/profile'
import { Layout } from '@/src/shared/ui/Layout/Layout'
import { GetServerSideProps } from 'next'

import { NextPageWithLayout } from '../_app'

const PersonalInfo: NextPageWithLayout = (props: any) => {
  return <Profile {...props} />
}

PersonalInfo.getLayout = function getLayout(page: ReactElement) {
  return <Layout withSidebar>{page}</Layout>
}

export default PersonalInfo

export const getServerSideProps: GetServerSideProps = async context => {
  const locale = context.req.cookies['next-language'] || 'en'
  const messages = (await import(`../../locales/${locale}.json`)).default

  return {
    props: {
      messages,
    },
  }
}
