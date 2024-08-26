import { PropsWithChildren, useEffect } from 'react'

import { useMeQuery } from '@/src/features/auth/service/auth.service'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { useRouter } from 'next/router'

export default function RequireAuth({ children }: PropsWithChildren) {
  const { isError, isLoading } = useMeQuery()
  const router = useRouter()

  useEffect(() => {
    if (!isError) {
      return
    }
    void router.push(RouterPaths.SIGN_IN)
  }, [isError, router])

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return null
  }

  return <>{children}</>
}
