import React from 'react'

import { useGoogleLoginMutation } from '@/src/features/auth/service/auth.service'
import { GitHubIcon } from '@/src/shared/assets/icons/github'
import { GoogleIcon } from '@/src/shared/assets/icons/google'
import { Button } from '@bitovyevolki/ui-kit-int'
import { useGoogleLogin } from '@react-oauth/google'

import s from './socialRegisterLogin.module.scss'

export const SocialsRegisterLogin = () => {
  const [googleLogin] = useGoogleLoginMutation()

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        const userInfo = await fetch('https://inctagram.work/api/v1/auth/google/login', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }).then(res => res.json())

        const data = {
          email: userInfo.email,
          token: tokenResponse.access_token,
        }

        await googleLogin(data).unwrap()
      } catch (error: any) {
        console.error(error.data.messages[0].message)
      }
    },
  })

  return (
    <div className={s.socialIcons}>
      <Button onClick={handleGoogleLogin} variant={'ghost'}>
        <GoogleIcon height={36} width={36} />
      </Button>
      <Button onClick={() => {}} variant={'ghost'}>
        <GitHubIcon height={36} width={36} />
      </Button>
    </div>
  )
}
