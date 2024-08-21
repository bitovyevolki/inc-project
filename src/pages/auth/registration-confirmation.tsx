import { RegistrationConfirmation } from '@/src/features/auth/registrationConfirmation'
import { GetServerSideProps } from 'next'

export default function RegistrationConfirmationPage(props: any) {
  return <RegistrationConfirmation {...props} />
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
