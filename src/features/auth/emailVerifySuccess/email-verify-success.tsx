import { Button, Typography } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'
import Link from 'next/link'

import s from './email-verify-success.module.scss'

import emailConfirmed from './../../../../public/image/email-confirmed.png'
export const EmailVerifySuccess = () => {
  return (
    <div className={s.pageWrapper}>
      <div className={s.infoWrapper}>
        <Typography variant={'h1'}>{'Congratulations!'}</Typography>
        <Typography variant={'body1'}>{'Your email has been confirmed.'}</Typography>
      </div>
      <Button as={Link} className={s.button} href={'/signin'} variant={'primary'}>
        <Typography variant={'h3'}>{'Sign in'}</Typography>
      </Button>
      <Image alt={'Sign up is success'} className={s.img} src={emailConfirmed} />
    </div>
  )
}
