import React from 'react'
import { Card, Input, Button, Typography } from '@bitovyevolki/ui-kit-int'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import s from './CreateNewPassword.module.scss'

const schema = z
  .object({
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(20, 'Password must be at most 20 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(20, 'Password must be at most 20 characters long'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'The passwords must match',
    path: ['confirmPassword'],
  })

export const CreateNewPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  interface FormData {
    field1: string | number
    field2: string | number
  }

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <div className={s.wrapper}>
      <Card className={s.card}>
        <h3 className={s.text}>Create New Password</h3>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                onChange={field.onChange}
                placeholder="New password"
                variant="password"
                error={errors.newPassword?.message}
              />
            )}
          />
          <div className={s.space}></div>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                onChange={field.onChange}
                placeholder="Password confirmation"
                variant="password"
                error={errors.confirmPassword?.message}
              />
            )}
          />

          <Typography className={s.helptext} variant="body1">
            Your password must be between 6 and 20 characters
          </Typography>
          <div className={s.spacer}></div>
          <Button className={s.btn} as="button" fullWidth variant="primary">
            Create new password
          </Button>
        </form>
      </Card>
    </div>
  )
}
