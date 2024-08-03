import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Button, Card, FormInput, Typography } from '@bitovyevolki/ui-kit-int'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import s from './CreateNewPassword.module.scss'

const schema = z
  .object({
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(20, 'Password must be at most 20 characters long'),
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(20, 'Password must be at most 20 characters long'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'The passwords must match',
    path: ['confirmPassword'],
  })

export const CreateNewPassword = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
  })

  interface FormData {
    confirmPassword: string
    newPassword: string
  }

  const onSubmit: SubmitHandler<FormData> = data => {
    // console.log(data)
  }

  return (
    <div className={s.wrapper}>
      <Card className={s.card}>
        <h3 className={s.textWrapper}>Create New Password</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.form}>
            <div>
              <Controller
                control={control}
                name="newPassword"
                render={({ field }) => (
                  <FormInput
                    {...field}
                    control={control}
                    errorMessage={errors.newPassword?.message}
                    placeholder="New password"
                    variant="password"
                  />
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormInput
                    {...field}
                    control={control}
                    errorMessage={errors.confirmPassword?.message}
                    placeholder="Password confirmation"
                    variant="password"
                  />
                )}
              />
            </div>
          </div>
          <div className={s.infoWrapper}>
            <div>
              <Typography className={s.infoText} variant="body1">
                Your password must be between 6 and 20 characters
              </Typography>
            </div>
            <div className={s.btnWrapper}>
              <Button as="button" className={s.btn} fullWidth variant="primary">
                Create new password
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}
