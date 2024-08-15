import { SignInForm } from '@/src/features/auth/signIn'
import { GetServerSideProps } from 'next'

export default function SignInPage(props: any) {
  return <SignInForm {...props} />
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
