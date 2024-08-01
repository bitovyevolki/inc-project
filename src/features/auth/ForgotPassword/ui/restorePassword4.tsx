import * as React from 'react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button, Card, Typography } from '@bitovyevolki/ui-kit-int'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './restorePassword.module.scss'

import { FormInput } from './FormInput.tsx'

const schema = z.object({
  email: z.string().email(),
})

type Fields = z.infer<typeof schema>

export const RestorePassword4 = () => {
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
    <div className={s.wrapper}>
      <Card as={'div'} className={s.card}>
        <Typography as={'h1'} className={s.accentColor} variant={'h2'}>
          Forgot password
        </Typography>
        <form className={s.form} onSubmit={onSubmit}>
          <div>
            <label className={s.caption} htmlFor={'email'}>
              Email
            </label>
            {/*            <Controller
              control={control}
              name={'email'}
              render={({ field }) => (
                <Input
                  {...field}
                  error={errors.email?.message}
                  id={'email'}
                  onChange={field.onChange}
                  placeholder={'Epam@epam.com'}
                  required
                  variant={'base'}
                />
              )}
            />*/}
            <FormInput
              control={control}
              name={'email'}
              placeholder={'Epam@epam.com'}
              required
              variant={'base'}
            />
          </div>
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
  )
}
