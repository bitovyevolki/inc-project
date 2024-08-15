import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useCreateNewPasswordMutation } from '@/src/features/auth/service/auth.service'
import { ServerError } from '@/src/features/auth/service/auth.types'
import { SignInForm } from '@/src/features/auth/signIn'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Button, Card, FormInput, Typography } from '@bitovyevolki/ui-kit-int'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './createNewPassword.module.scss'

const schema = z
  .object({
    confirmPassword: z
      .string({ required_error: 'Password is absolutely necessary!' })
      .min(6, 'Password must be min 6 characters long')
      .max(20, 'Password must be max 20 characters long'),
    newPassword: z
      .string({ required_error: 'Password is absolutely necessary!' })
      .min(6, 'Password must be min 6 characters long')
      .max(20, 'Password must be max 20 characters long'),
  })
  .refine(
    values => {
      return values.newPassword === values.confirmPassword
    },
    {
      message: 'Passwords must match',
      path: ['confirmPassword'],
    }
  )

type Fields = z.infer<typeof schema>
type Props = { recoveryCode: string }

export const CreateNewPassword = ({ recoveryCode }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Fields>({ resolver: zodResolver(schema) })

  const [createNewPassword, { error, isError, isLoading, isSuccess }] =
    useCreateNewPasswordMutation()
  const serverError = (error as ServerError)?.data?.messages[0]?.message

  const onSubmit = handleSubmit(data => {
    const newPassword = data.newPassword

    createNewPassword({ newPassword, recoveryCode })
  })

  if (isLoading) {
    return <Loader />
  }

  if (isSuccess) {
    return <SignInForm />
  }

  if (isError) {
    toast.error(serverError)
  }

  return (
    <div className={s.wrapper}>
      <Card as={'div'} className={s.card}>
        <Typography as={'h1'} className={s.accentColor} variant={'h2'}>
          Create new password
        </Typography>
        <form className={s.form} onSubmit={onSubmit}>
          <FormInput
            control={control}
            errorMessage={errors.newPassword?.message}
            inputMode={'text'}
            label={'New password'}
            name={'newPassword'}
            type={'password'}
          />
          <FormInput
            control={control}
            errorMessage={errors.confirmPassword?.message}
            inputMode={'text'}
            label={'Password confirmation'}
            name={'confirmPassword'}
            type={'password'}
          />
          <Typography as={'p'} className={s.secondaryColor} variant={'caption'}>
            Your password must be between 6 and 20 characters
          </Typography>
          <Button fullWidth type={'submit'} variant={'primary'}>
            Create new password
          </Button>
        </form>
      </Card>
    </div>
  )
}
