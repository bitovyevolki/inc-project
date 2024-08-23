import * as React from 'react'
import { useState } from 'react'
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useSendResetPasswordEmailMutation } from '@/src/features/auth/service/auth.service'
import { ServerError } from '@/src/features/auth/service/auth.types'
import { Nullable } from '@/src/shared/types/globalTypes'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Button, Card, FormInput, ModalWindow, Typography } from '@bitovyevolki/ui-kit-int'
import { zodResolver } from '@hookform/resolvers/zod'
import i18n from 'i18next'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

import s from './forgotPassword.module.scss'

const schemaEn = z.object({
  email: z
    .string({ required_error: 'Email is absolutely necessary!' })
    .email({ message: "Hello, that's not a way to write email" }),
})

const schemaRu = z.object({
  email: z
    .string({ required_error: 'Обязательное поле' })
    .email({ message: 'Проверьте правильность написания адреса' }),
})

type Fields = z.infer<typeof schemaEn>

export const ForgotPassword = () => {
  const t = useTranslations('PasswordRecovery')
  const locale = i18n.language

  const schema = locale === 'en' ? schemaEn : schemaRu

  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
  } = useForm<Fields>({ defaultValues: { email: '' }, resolver: zodResolver(schema) })

  const [captchaToken, setCaptchaToken] = useState<Nullable<string>>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [sendResetPassword, { error, isError, isLoading, isSuccess }] =
    useSendResetPasswordEmailMutation()
  const serverError = (error as ServerError)?.data?.messages[0]?.message

  const onSubmit = handleSubmit(async ({ email }) => {
    if (!captchaToken) {
      return
    }
    await sendResetPassword({ email, recaptcha: captchaToken })
    setCaptchaToken(null)
    setIsModalOpen(true)
  })

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const captchaHandler = (token: Nullable<string>) => {
    setCaptchaToken(token)
  }

  const reCaptchaKey = process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY_ID

  if (!reCaptchaKey) {
    throw new Error(`${t('noRecaptchaError')}`)
  }

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    toast.error(serverError)
  }

  return (
    <>
      {isSuccess && (
        <ModalWindow onOpenChange={closeModal} open={isModalOpen} title={t('ModalTitle')}>
          <div className={s.card}>
            <Typography as={'p'} variant={'body1'}>
              {`${t('sentLinkConfirmationMessage1')} ${getValues('email')}${t(
                'sentLinkConfirmationMessage2'
              )}`}
            </Typography>
            <Button className={s.buttonRight} onClick={closeModal} variant={'primary'}>
              {t('OK')}
            </Button>
          </div>
        </ModalWindow>
      )}
      <div className={s.wrapper}>
        <Card as={'div'} className={s.card}>
          <Typography as={'h1'} className={s.accentColor} variant={'h2'}>
            {t('formTitle')}
          </Typography>
          <form className={s.form} onSubmit={onSubmit}>
            <FormInput
              control={control}
              errorMessage={errors.email?.message}
              inputMode={'email'}
              label={`${t('email')}`}
              name={'email'}
              placeholder={'Epam@epam.com'}
            />
            <Typography as={'p'} className={s.secondaryColor} variant={'caption'}>
              {t('instructions')}
            </Typography>
            <Button
              disabled={!isValid || !captchaToken}
              fullWidth
              type={'submit'}
              variant={'primary'}
            >
              {t('sendLink')}
            </Button>
            <Button component={Link} fullWidth href={'/auth/sign-in'} variant={'ghost'}>
              {t('backToSignIn')}
            </Button>

            <ReCAPTCHA
              className={s.capture}
              hl={locale}
              onChange={captchaHandler}
              sitekey={reCaptchaKey}
              theme={'dark'}
            />
          </form>
        </Card>
      </div>
    </>
  )
}
