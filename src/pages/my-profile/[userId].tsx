import * as React from 'react'
import { PropsWithChildren, ReactElement } from 'react'

import { ShowPosts } from '@/src/features/post/ui/showPosts/ShowPosts'
import RequireAuth from '@/src/shared/providers/RequireAuth'
import { Layout } from '@/src/shared/ui/Layout/Layout'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

function MyProfilePage(props: any) {
  const router = useRouter()
  const userId = router.query.userId as string

  return <ShowPosts profileId={userId} {...props} />
}

MyProfilePageProtected.getLayout = function getLayout(page: ReactElement) {
  return <Layout withSidebar>{page}</Layout>
}

export default function MyProfilePageProtected({ children }: PropsWithChildren) {
  return (
    <>
      <RequireAuth>
        <MyProfilePage />
      </RequireAuth>
    </>
  )
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
