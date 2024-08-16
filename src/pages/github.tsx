import { toast } from 'react-toastify'

import { RouterPaths } from '@/src/shared/config/router.paths'
import { useRouter } from 'next/router'

const Github = () => {
  const router = useRouter()
  const { accessToken } = router.query

  if (accessToken) {
    localStorage.setItem('token', accessToken as string)

    toast.success('Login successful')

    router.push(RouterPaths.PERSONAL_INFO)
  }

  return null
}

export default Github
