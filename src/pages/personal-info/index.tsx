import { Profile } from '@/src/entities/profile/userProfile'
import { GetServerSideProps } from 'next'

import { NextPageWithLayout } from '../_app'

const PersonalInfo: NextPageWithLayout = (props: any) => {
  return <Profile {...props} />
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
