import * as React from 'react'
import { useForm } from 'react-hook-form'

import { Button, Card, Input, Typography } from '@bitovyevolki/ui-kit-int'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './restorePassword.module.scss'

// const emailRegex =
//   /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/

const schema = z.object({
  email: z.string().email(),
})

type Fields = z.infer<typeof schema>

type Props = {}

export const RestorePassword = (props: Props) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<Fields>({ resolver: zodResolver(schema) })
  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  return (
    <div className={s.wrapper}>
      <Card as={'div'} className={s.card}>
        <Typography as={'h1'} className={s.formTitle} variant={'h2'}>
          Forgot password
        </Typography>
        <form className={s.form} onSubmit={onSubmit}>
          <div>
            <label className={s.caption} htmlFor={'email'}>
              Email
            </label>
            <Input
              {...register('email')}
              onChange={() => {}}
              placeholder={'Epam@epam.com'}
              value={'email'}
              variant={'base'}
            />
          </div>
          {errors.email?.message && (
            <Typography as={'p'} className={s.red} variant={'caption'}>
              {errors.email?.message}
            </Typography>
          )}
          <Typography as={'p'} className={s.caption} variant={'caption'}>
            Enter your email address and we will send you further instructions.
          </Typography>
          <Button fullWidth variant={'primary'}>
            Send link
          </Button>
          <Button as={'a'} fullWidth href={'/signin'} variant={'ghost'}>
            Back to sign in
          </Button>
        </form>
        <div className={s.captureWrapper}>Capture</div>
      </Card>
    </div>
  )
}
