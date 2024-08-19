import { Button, Typography } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import s from './email-verify-success.module.scss'

import emailConfirmed from './../../../../public/image/email-confirmed.png'
export const EmailVerifySuccess = () => {
  const t = useTranslations('EmailVerify')

  return (
    <div className={s.pageWrapper}>
      <div className={s.infoWrapper}>
        <Typography variant={'h1'}>{`${t('Congratulations!')}`}</Typography>
        <Typography variant={'body1'}>{`${t('confirmMessage')}`}</Typography>
      </div>
      <Button as={Link} className={s.button} href={'/sign-in'} variant={'primary'}>
        <Typography variant={'h3'}>{'Sign in'}</Typography>
      </Button>
      <Image alt={'Sign up is success'} className={s.img} src={emailConfirmed} />
    </div>
  )
}
