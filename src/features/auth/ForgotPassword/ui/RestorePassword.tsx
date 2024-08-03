import * as React from 'react'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import { ExpiredLink } from '@/src/features/auth/ForgotPassword/ui/ExpiredLink'
import { Button, Card, FormInput, Typography } from '@bitovyevolki/ui-kit-int'
import { zodResolver } from '@hookform/resolvers/zod'
import { Inter } from 'next/font/google'
import { z } from 'zod'

import s from './restorePassword.module.scss'

const inter = Inter({ subsets: ['latin'] })

const TEST_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

const schema = z.object({
  email: z
    .string({ required_error: 'Email is absolutely necessary!' })
    .email({ message: "Hello, that's not a way to write email" })
    .trim(),
})

type Fields = z.infer<typeof schema>
const RestorePassword = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Fields>({ resolver: zodResolver(schema) })

  const [isLinkSent, setLinkSent] = useState(false)
  const [isCaptureChecked, setIsCaptureChecked] = useState(false)
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)

  const onSubmit = handleSubmit(data => {
    // console.log(data)
    setLinkSent(!isLinkSent)
  })

  const captchaHandler = (token: null | string) => {
    // console.log('Captcha token: ', token)
    setIsCaptureChecked(true)
    setIsSubmitDisabled(false)
  }

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
              inputMode={'email'}
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
            <Button disabled={isSubmitDisabled} fullWidth type={'submit'} variant={'primary'}>
              Send link
            </Button>
            <Button as={'a'} fullWidth href={'/signin'} variant={'ghost'}>
              Back to sign in
            </Button>
            <ReCAPTCHA
              className={s.capture}
              hl={'en'}
              onChange={captchaHandler}
              sitekey={TEST_SITE_KEY}
              theme={'dark'}
            />
          </form>
        </Card>
      </div>
      {/*Temporary fix for demonstration of ExpiredLink which is dependent on user's actions*/}
      {isLinkSent && <ExpiredLink />}
    </>
  )
}

export default RestorePassword
