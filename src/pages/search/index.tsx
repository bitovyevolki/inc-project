import { ReactElement } from 'react'

import { SearchUsers } from '@/src/entities/profile/searchUsers'
import { Layout } from '@/src/shared/ui/Layout/Layout'
import { GetServerSideProps } from 'next'

import { NextPageWithLayout } from '../_app'

const SearchUsersPage: NextPageWithLayout = (props: any) => {
  return <SearchUsers {...props} />
}

SearchUsersPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout withSidebar>{page}</Layout>
}

export default SearchUsersPage

export const getServerSideProps: GetServerSideProps = async context => {
  const locale = context.req.cookies['next-language'] || 'en'
  const messages = (await import(`../../locales/${locale}.json`)).default

  return {
    props: {
      messages,
    },
  }
}
