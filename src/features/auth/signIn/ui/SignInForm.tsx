import { SubmitHandler, useForm } from 'react-hook-form'

import { SocialsRegisterLogin } from '@/src/features/auth/socialsRegisterLogin/SocialsRegisterLogin'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { RoundLoader } from '@/src/shared/ui/RoundLoader/RoundLoader'
import { Button, Card, FormInput, Typography } from '@bitovyevolki/ui-kit-int'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
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

  if (isLoading) {
    return <RoundLoader variant={'large'} />
  }

  return (
    <div className={s.wrapper}>
      <Card className={s.card}>
        <Typography variant={'h2'}>{t('title')}</Typography>
        <SocialsRegisterLogin />
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
            <Button fullWidth type={'submit'} variant={'primary'}>
              {t('signin')}
            </Button>
            <Typography className={s.text} variant={'subTitle1'}>
              {t('have-account')}
            </Typography>
            {/* @ts-ignore */}
            <Button
              as={Link}
              className={s.registerLink}
              fullWidth
              href={'sign-up'}
              variant={'ghost'}
            >
              <Typography variant={'subTitle1'}>{t('registration')}</Typography>
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
