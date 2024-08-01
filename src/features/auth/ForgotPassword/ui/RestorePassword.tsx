import * as React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ExpiredLink } from '@/src/features/auth/ForgotPassword/ui/ExpiredLink'
import { Button, Card, FormInput, Typography } from '@bitovyevolki/ui-kit-int'
import { zodResolver } from '@hookform/resolvers/zod'
import { Inter } from 'next/font/google'
import { z } from 'zod'

import s from './restorePassword.module.scss'

const inter = Inter({ subsets: ['latin'] })

const schema = z.object({
  email: z
    .string({ required_error: 'Email is absolutely necessary!' })
    .email({ message: "Hello, that's not a way to write email" })
    .trim(),
})

type Fields = z.infer<typeof schema>

export const RestorePassword = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Fields>({ resolver: zodResolver(schema) })

  const [isLinkSent, setLinkSent] = useState(false)

  const onSubmit = handleSubmit(data => {
    console.log(data)
    setLinkSent(!isLinkSent)
  })

  return (
    <>
      <div className={s.wrapper}>
        <Card as={'div'} className={s.card}>
          <Typography as={'h1'} className={s.accentColor} variant={'h2'}>
            Forgot password
          </Typography>
          <form className={s.form} onSubmit={onSubmit}>
            <FormInput
              control={control}
              errorMessage={errors.email?.message}
              label={'Email'}
              name={'email'}
              placeholder={'Epam@epam.com'}
              required
            />
            <Typography as={'p'} className={s.secondaryColor} variant={'caption'}>
              Enter your email address and we will send you further instructions.
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
              Back to sign in
            </Button>
          </form>
          <div className={s.captureWrapper}>Capture</div>
        </Card>
      </div>
      {/*Temporary fix for demonstration of ExpiredLink which is dependent on user's actions*/}
      {isLinkSent && <ExpiredLink />}
    </>
  )
}
