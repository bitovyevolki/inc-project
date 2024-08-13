import { useEffect, useState } from 'react'

import { EmailVerifySuccess } from '@/src/features/auth/emailVerifySuccess/email-verify-success'

import { useConfirmEmailMutation } from '@/src/features/auth/service/auth.service'
import { Typography } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ExpiredLink } from '@/src/features/auth/expiredLink'

export default function RegistrationConfirmation() {
  const router = useRouter()
  const [confirmEmail, { isLoading }] = useConfirmEmailMutation()
  const { code, email } = router.query
  const [isExpired, setIsExpired] = useState<boolean>(false)

  useEffect(() => {
    if (router.isReady) {
      const fetchConfirmation = async () => {
        try {
          await confirmEmail({
            confirmationCode: code as string,
          }).unwrap()
        } catch (error: any) {
          if (
            error.status === 400 &&
            error.data.messages[0].message === 'Confirmation code is invalid'
          ) {
            setIsExpired(true)
            // eslint-disable-next-line no-console
            console.log(error.data.messages[0].message)
          } else {
            // eslint-disable-next-line no-console
            console.log(error.data.messages[0].message)
          }
        }
      }

      fetchConfirmation()
    }
  }, [router.isReady, code, email, confirmEmail])

  if (isLoading) {
    return <Typography variant={'body2'}>{'Loading .....'}</Typography>
  }

  return (
    <>
      <Link href={'/'}>back</Link>
      {isExpired ? <ExpiredLink email={email as string} /> : <EmailVerifySuccess />}
    </>
  )
}
