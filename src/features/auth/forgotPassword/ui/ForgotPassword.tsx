import * as React from 'react'
import { useState } from 'react'
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import { useSendResetPasswordEmailMutation } from '@/src/features/auth/service/auth.service'
import { ErrorResponse } from '@/src/features/auth/service/auth.types'
import { Nullable } from '@/src/shared/types/globalTypes'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Button, Card, FormInput, ModalWindow, Typography } from '@bitovyevolki/ui-kit-int'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { z } from 'zod'

import s from './forgotPassword.module.scss'

const schema = z.object({
  email: z
    .string({ required_error: 'Email is absolutely necessary!' })
    .email({ message: "Hello, that's not a way to write email" })
    .trim(),
})

type Fields = z.infer<typeof schema>

export const ForgotPassword = () => {
  //

  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    setError,
  } = useForm<Fields>({ defaultValues: { email: '' }, resolver: zodResolver(schema) })

  const [captchaToken, setCaptchaToken] = useState<Nullable<string>>()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [sendResetPassword, { isLoading }] = useSendResetPasswordEmailMutation()

  const onSubmit = handleSubmit(({ email }) => {
    if (!captchaToken) {
      return
    }

    sendResetPassword({ email, recaptcha: captchaToken })
      .unwrap()
      .then(() => setIsModalOpen(true))
      .catch((error: ErrorResponse) => {
        const errorField = error?.data?.messages?.[0]?.field

        if (errorField !== 'email') {
          return
        }

        const message = error?.data?.messages?.[0]?.message

        setError(errorField, { message })
      })
  })

  const captchaHandler = (token: null | string) => {
    setCaptchaToken(token)
  }
  const reCaptchaKey = process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY_ID

  if (!reCaptchaKey) {
    throw new Error('We are not getting reCaptcha here')
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      {isModalOpen && (
        <Modal closeModal={closeModal} email={getValues('email')} open={isModalOpen} />
      )}
      <div className={s.wrapper}>
        <Card as={'div'} className={s.card}>
          <Typography as={'h1'} className={s.accentColor} variant={'h2'}>
            Forgot password
          </Typography>
          <form className={s.form} onSubmit={onSubmit}>
            <FormInput
              control={control}
              errorMessage={errors.email?.message}
              inputMode={'email'}
              label={'Email'}
              name={'email'}
              placeholder={'Epam@epam.com'}
            />
            <Typography as={'p'} className={s.secondaryColor} variant={'caption'}>
              Enter your email address and we will send you further instructions.
            </Typography>
            <Button
              disabled={!isValid || !captchaToken}
              fullWidth
              type={'submit'}
              variant={'primary'}
            >
              Send link
            </Button>
            <Button as={Link} fullWidth href={'/auth/sign-in'} variant={'ghost'}>
              Back to sign in
            </Button>
            <ReCAPTCHA
              className={s.capture}
              hl={'en'}
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

type ModalProps = {
  closeModal: () => void
  email: string
  open: boolean
}

const Modal = ({ closeModal, email, open }: ModalProps) => {
  return (
    <ModalWindow onOpenChange={closeModal} open={open} title={'Email sent'}>
      <div className={s.card}>
        <Typography as={'p'} variant={'body1'}>
          {`The link has been sent by email to ${email}. If you don’t receive an email send link again.`}
        </Typography>
        <Button className={s.buttonRight} onClick={closeModal} variant={'primary'}>
          OK
        </Button>
      </div>
    </ModalWindow>
  )
}
