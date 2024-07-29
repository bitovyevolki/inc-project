import * as React from 'react'
import { useForm } from 'react-hook-form'

import { Button, Card, Input, Typography } from '@bitovyevolki/ui-kit-int'

import s from './restorePassword.module.scss'

type Fields = {
  email: string
}

type Props = {}
export const RestorePassword2 = (props: Props) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<Fields>()

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  return (
    <div className={s.wrapper}>
      <Card className={s.card}>
        <Typography as={'h1'} className={s.accentColor} variant={'h2'}>
          Forgot password
        </Typography>
        <form className={s.form} onSubmit={onSubmit}>
          <div>
            <label htmlFor={'restorePasswordEmail'}>Email</label>
            <Input
              id={'restorePasswordEmail'}
              {...register('email', {
                required: 'Email is required',
              })}
              error={errors.email?.message}
              placeholder={'Enamp@enam.com'}
              value={'ar@enam.ru'}
              variant={'base'}
            />
          </div>
          <Typography as={'p'} variant={'caption'}>
            Enter your email address and we will send you further instructions{' '}
          </Typography>
          <Button fullWidth type={'submit'} variant={'primary'}>
            Send link
          </Button>
          <Button as={'a'} fullWidth href={'/signin'} variant={'ghost'}>
            Back to Sign in
          </Button>
          <div className={s.wrapper}>Capture</div>
        </form>
      </Card>
    </div>
  )
}
