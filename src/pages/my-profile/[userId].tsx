import * as React from 'react'
import { ReactElement } from 'react'

import { ShowPosts } from '@/src/features/post/ui/showPosts/ShowPosts'
import { Layout } from '@/src/shared/ui/Layout/Layout'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

export default function MyProfilePage(props: any) {
  const router = useRouter()
  const userId = router.query.userId as string

  return <ShowPosts profileId={userId} {...props} />
}

MyProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout withSidebar>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async context => {
  const locale = context.req.cookies['next-language'] || 'en'
  const messages = (await import(`../../locales/${locale}.json`)).default

  return {
    props: {
      messages,
    },
  }
}
