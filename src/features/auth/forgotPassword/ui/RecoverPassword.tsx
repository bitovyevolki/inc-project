import * as React from 'react'

import { CreateNewPassword } from '@/src/features/auth/createNewPassword'
import { ExpiredLink } from '@/src/features/auth/expiredLink'
import { useCheckPasswordRecoveryCodeQuery } from '@/src/features/auth/service/auth.service'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { useRouter } from 'next/router'

export function RecoverPassword() {
  const router = useRouter()
  const recoveryCode = router.query.code?.toString?.() ?? ''
  const email = router.query.email?.toString?.() ?? ''

  const { isError, isLoading } = useCheckPasswordRecoveryCodeQuery(
    {
      recoveryCode,
    },
    {
      skip: !recoveryCode,
    }
  )

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <ExpiredLink email={email} />
  }

  return <CreateNewPassword recoveryCode={recoveryCode} />
}
