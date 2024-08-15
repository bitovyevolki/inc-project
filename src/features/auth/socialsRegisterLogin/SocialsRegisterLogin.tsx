import React from 'react'
import { toast } from 'react-toastify'

import { useGoogleLoginMutation } from '@/src/features/auth/service/auth.service'
import { GitHubIcon } from '@/src/shared/assets/icons/github'
import { GoogleIcon } from '@/src/shared/assets/icons/google'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { Button } from '@bitovyevolki/ui-kit-int'
import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'

import s from './socialRegisterLogin.module.scss'

export const SocialsRegisterLogin = () => {
  const [googleLogin] = useGoogleLoginMutation()
  const router = useRouter()

  const handleGoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async tokenResponse => {
      try {
        await googleLogin({ code: tokenResponse.code }).unwrap()
        toast.success('Login successful:')
        router.push(RouterPaths.PERSONAL_INFO)
      } catch (error: any) {
        toast.error(error.data.messages[0].message)
      }
    },
  })

  const githubLoginAndRegister = () => {
    if (process.env.NEXT_PUBLIC_GITHUB_AUTH_URL) {
      window.location.assign(process.env.NEXT_PUBLIC_GITHUB_AUTH_URL)

      return
    }
  }

  return (
    <div className={s.socialIcons}>
      <Button onClick={handleGoogleLogin} variant={'ghost'}>
        <GoogleIcon height={36} width={36} />
      </Button>
      <Button onClick={githubLoginAndRegister} variant={'ghost'}>
        <GitHubIcon height={36} width={36} />
      </Button>
    </div>
  )
}
