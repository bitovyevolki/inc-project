import { SignUpForm } from '@/src/features/auth/signUp'
import { GetServerSideProps } from 'next'

export default function SignUpPage(props: any) {
  return <SignUpForm {...props} />
}
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
