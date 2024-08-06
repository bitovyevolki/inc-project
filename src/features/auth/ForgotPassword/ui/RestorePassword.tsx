import * as React from 'react'
import { useState } from 'react'
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import { Button, Card, FormInput, Typography } from '@bitovyevolki/ui-kit-int'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { z } from 'zod'

import s from './restorePassword.module.scss'

const schema = z.object({
  email: z
    .string({ required_error: 'Email is absolutely necessary!' })
    .email({ message: "Hello, that's not a way to write email" })
    .trim(),
})

type Nullable<T> = T | null

type Fields = z.infer<typeof schema>
const RestorePassword = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<Fields>({ defaultValues: { email: '' }, resolver: zodResolver(schema) })

  const [captchaToken, setCaptchaToken] = useState<Nullable<string>>()

  const [isLinkSent, setLinkSent] = useState(false)

  const onSubmit = handleSubmit(data => {
    setLinkSent(!isLinkSent)
  })

  const captchaHandler = (token: null | string) => {
    setCaptchaToken(token)
  }
  const reCaptchaKey = process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY_ID

  if (!reCaptchaKey) {
    throw new Error('We are not getting reCaptcha here')
  }

  return (
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
          {isLinkSent && (
            <Typography as={'p'} className={s.accentColor} variant={'caption'}>
              The link has been sent by email. If you don’t receive an email send link again
            </Typography>
          )}
          <Button
            disabled={!isValid || !captchaToken}
            fullWidth
            type={'submit'}
            variant={'primary'}
          >
            Send link
          </Button>
          <Button as={Link} fullWidth href={'/signin'} variant={'ghost'}>
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
  )
}

export default RestorePassword
