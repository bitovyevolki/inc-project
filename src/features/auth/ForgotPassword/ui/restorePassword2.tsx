import * as React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ExpiredLink } from '@/src/features/auth/ForgotPassword/ui/expiredLink'
import { Button, Card, Input, Typography } from '@bitovyevolki/ui-kit-int'
import { Inter } from 'next/font/google'

import s from './restorePassword.module.scss'

const inter = Inter({ subsets: ['latin'] })

type Fields = {
  email: string
}

type Props = {}
export const RestorePassword2 = (props: Props) => {
  const [isLinkSent, setLinkSet] = useState(false)
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<Fields>()

  const onSubmit = handleSubmit(data => {
    console.log(data)
    setLinkSet(!isLinkSent)
  })

  return (
    <>
      <div className={s.wrapper}>
        <Card className={s.card}>
          <Typography as={'h1'} className={s.accentColor} variant={'h2'}>
            Forgot password
          </Typography>
          <form className={s.form} onSubmit={onSubmit}>
            <Input
              id={'email'}
              {...register('email', {
                required: 'Email is required',
              })}
              errorMessage={errors.email?.message}
              label={'Email'}
              placeholder={'Enamp@enam.com'}
              required
              type={'email'}
            />
            <Typography as={'p'} className={s.secondaryColor} variant={'caption'}>
              Enter your email address and we will send you further instructions
            </Typography>
            {isLinkSent && (
              <Typography as={'p'} className={s.accentColor} variant={'caption'}>
                The link has been sent by email. If you don’t receive an email send link again
              </Typography>
            )}
            <Button fullWidth type={'submit'} variant={'primary'}>
              Send link
            </Button>
            <Button as={'a'} fullWidth href={'/signin'} variant={'ghost'}>
              Back to Sign in
            </Button>
          </form>
          <div className={s.wrapper}>Capture</div>
        </Card>
      </div>
      {isLinkSent && <ExpiredLink />}
    </>
  )
}
