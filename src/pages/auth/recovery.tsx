import { RecoverPassword } from '@/src/features/auth/forgotPassword'
import { GetServerSideProps } from 'next'

export default function RecoveryPage(props: any) {
  return <RecoverPassword {...props} />
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
