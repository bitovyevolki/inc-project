import { EmailVerifySuccess } from '@/src/features/auth/emailVerifySuccess/email-verify-success'
import { ExpiredLink } from '@/src/features/auth/expiredLink'
import { useConfirmEmailQuery } from '@/src/features/auth/service/auth.service'
import { Typography } from '@bitovyevolki/ui-kit-int'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

export function RegistrationConfirmation() {
  const router = useRouter()
  const { code, email } = router.query

  const { error, isLoading, isSuccess } = useConfirmEmailQuery(
    { confirmationCode: code as string },
    { skip: !code }
  )

  if (isLoading) {
    return <Typography variant={'body2'}>{'Loading .....'}</Typography>
  }
  if (
    (error as FetchBaseQueryError)?.status === 400 &&
    (error as FetchBaseQueryError)?.data &&
    (error as any).data?.messages?.[0]?.message === 'Confirmation code is invalid'
  ) {
    return (
      <div>
        <Link href={'/'}>back</Link>
        <ExpiredLink email={email as string} />
      </div>
    )
  }
  if (isSuccess) {
    return (
      <div>
        <Link href={'/'}>back</Link>
        <EmailVerifySuccess />
      </div>
    )
  }
}
