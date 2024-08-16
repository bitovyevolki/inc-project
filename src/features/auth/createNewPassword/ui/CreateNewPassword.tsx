import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useCreateNewPasswordMutation } from '@/src/features/auth/service/auth.service'
import { ServerError } from '@/src/features/auth/service/auth.types'
import { SignInForm } from '@/src/features/auth/signIn'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Button, Card, FormInput, Typography } from '@bitovyevolki/ui-kit-int'
import { zodResolver } from '@hookform/resolvers/zod'
import i18n from 'i18next'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

import s from './createNewPassword.module.scss'

const schemaEn = z
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
const schemaRu = z
  .object({
    confirmPassword: z
      .string({ required_error: 'Обязательное поле' })
      .min(6, 'Пароль должен содержать не меньше 6 знаков')
      .max(20, 'Пароль должен содержать не больше 20 знаков'),
    newPassword: z
      .string({ required_error: 'Обязательное поле' })
      .min(6, 'Пароль должен содержать не меньше 6 знаков')
      .max(20, 'Пароль должен содержать не больше 20 знаков'),
  })
  .refine(
    values => {
      return values.newPassword === values.confirmPassword
    },
    {
      message: 'Пароли должны совпадать',
      path: ['confirmPassword'],
    }
  )

type Fields = z.infer<typeof schemaEn>
type Props = { recoveryCode: string }

export const CreateNewPassword = ({ recoveryCode }: Props) => {
  const t = useTranslations('CreateNewPassword')
  const locale = i18n.language

  const schema = locale === 'en' ? schemaEn : schemaRu

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
          {t('FormTitle')}
        </Typography>
        <form className={s.form} onSubmit={onSubmit}>
          <FormInput
            control={control}
            errorMessage={errors.newPassword?.message}
            inputMode={'text'}
            label={t('NewPasswordLabel')}
            name={'newPassword'}
            type={'password'}
          />
          <FormInput
            control={control}
            errorMessage={errors.confirmPassword?.message}
            inputMode={'text'}
            label={t('PasswordConfirmationLabel')}
            name={'confirmPassword'}
            type={'password'}
          />
          <Typography as={'p'} className={s.secondaryColor} variant={'caption'}>
            {t('Instructions')}
          </Typography>
          <Button fullWidth type={'submit'} variant={'primary'}>
            {t('ButtonCreatePassword')}
          </Button>
        </form>
      </Card>
    </div>
  )
}
