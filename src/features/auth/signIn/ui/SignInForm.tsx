import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { GitHubIcon } from '@/src/shared/assets/icons/github'
import { GoogleIcon } from '@/src/shared/assets/icons/google'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { Button, Card, FormInput, Typography } from '@bitovyevolki/ui-kit-int'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import { useTranslation } from 'next-i18next'
import { useTranslations } from 'next-intl'

import s from './signInForm.module.scss'

import { useSignInMutation } from '../../service/auth.service'
import { SignInResponseError } from '../../service/auth.types'
import { SignInFormData, signInSchema } from '../model/schema/signInSchema'

export const SignInForm = () => {
  const [signIn, { isLoading }] = useSignInMutation()
  const t = useTranslations('Signin')
  const router = useRouter()

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit: SubmitHandler<SignInFormData> = async data => {
    try {
      await signIn(data).unwrap()

      router.push(RouterPaths.PERSONAL_INFO)
    } catch (error) {
      const err = error as SignInResponseError

      setError('root', { message: err.data.messages })
    }
  }

  return (
    <div className={s.wrapper}>
      <Card className={s.card}>
        <Typography variant={'h2'}>{t('title')}</Typography>
        <div className={s.blockWithIcons}>
          <GoogleIcon height={36} width={36} />
          <GitHubIcon height={36} width={36} />
        </div>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.input}>
            <FormInput control={control} label={`${t('email')}`} name={'email'} />
          </div>
          <div className={s.input}>
            <FormInput
              control={control}
              label={`${t('password')}`}
              name={'password'}
              type={'password'}
            />
            {errors.root && (
              <Typography className={s.error} variant={'caption'}>
                {errors.root.message}
              </Typography>
            )}
            <Link className={s.link} href={'forgot-password'}>
              <Typography variant={'body2'}>{t('forgot')}</Typography>
            </Link>
          </div>
          <div className={s.buttons}>
            <Button as={'button'} fullWidth variant={'primary'}>
              {t('signin')}
            </Button>
            <Typography className={s.text} variant={'body2'}>
              {t('have-account')}
            </Typography>
            <Link className={s.link} href={'signup'}>
              <Button as={'button'} disabled={isLoading} fullWidth variant={'ghost'}>
                {t('registration')}
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  )
}
