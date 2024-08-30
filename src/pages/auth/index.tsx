import { useEffect } from 'react'

import { useRouter } from 'next/router'

export default function AuthIndex() {
  const router = useRouter()

  useEffect(() => {
    router.push('/')
  }, [router])

  return null
}
