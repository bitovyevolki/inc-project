import { ExpiredLink } from '@/src/features/auth/expiredLink'
import { GetServerSideProps } from 'next'

export default function ExpiredLinkPage(props: any) {
  const email = 'test@test.com'

  return <ExpiredLink email={email} {...props} />
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
