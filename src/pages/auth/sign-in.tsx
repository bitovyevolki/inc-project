import { SignInForm } from '@/src/features/auth/signIn'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function SignInPage(props: any) {
  console.log(props)

  return <SignInForm />
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const locale = context.locale

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}
