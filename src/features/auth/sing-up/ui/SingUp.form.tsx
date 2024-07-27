import { Controller } from 'react-hook-form'

import { SignUpFormValues, useSignUpForm } from '@/src/features/auth/sing-up/model/singUpSchema'
import { GitHubIcon } from '@/src/shared/assets/icons/github'
import { GoogleIcon } from '@/src/shared/assets/icons/google'
import { Button, Card, Checkbox, Input, Typography } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'

import s from './singUp.form.module.scss'

export const SingUpForm = () => {
  const termsOfServiceLink = ''
  const privacyPolicyLink = ''

  const { control, handleSubmit } = useSignUpForm()

  const sendHandler = (data: SignUpFormValues) => {
    const formData = new FormData()

    formData.append('userName', data.userName)
    formData.append('email', data.email)
    formData.append('password', data.password ?? '')
    formData.append('baseUrl', 'http://localhost:3000')

    //// check formData values
    // @ts-ignore
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`)
    }
  }

  return (
    <Card className={s.card}>
      <Typography variant={'h1'}>{'Sing-Up'}</Typography>
      <div className={s.socialIcons}>
        <GoogleIcon height={48} width={48} />
        <GitHubIcon height={48} width={48} />
      </div>

      <form className={s.form} onSubmit={handleSubmit(sendHandler)}>
        <div className={s.inputWrapper}>
          <Controller
            control={control}
            name={'userName'}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                error={error?.message}
                onChange={onChange}
                placeholder={'User Name'}
                value={value}
                variant={'base'}
              />
            )}
          />
        </div>
        <div className={s.inputWrapper}>
          <Controller
            control={control}
            name={'email'}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                error={error?.message}
                onChange={onChange}
                placeholder={'Email'}
                value={value}
                variant={'base'}
              />
            )}
          />
        </div>
        <div className={s.inputWrapper}>
          <Controller
            control={control}
            name={'password'}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                error={error?.message}
                onChange={onChange}
                placeholder={'Password'}
                value={value}
                variant={'password'}
              />
            )}
          />
        </div>
        <div className={s.inputWrapper}>
          <Controller
            control={control}
            name={'confirmPassword'}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                error={error?.message}
                onChange={onChange}
                placeholder={'Confirm Password'}
                value={value}
                variant={'password'}
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name={'agreeToTerms'}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className={s.agreeBlock}>
              <div className={s.checkBoxWrapper}>
                <Checkbox checked={value} label={'I agree to the'} onChange={onChange} />

                <Typography as={Link} href={termsOfServiceLink} variant={'link1'}>
                  {'Terms of Service'}
                </Typography>
                <Typography variant={'body2'}>{'and'}</Typography>
                <Typography as={Link} href={privacyPolicyLink} variant={'link1'}>
                  {'Privacy Policy'}
                </Typography>
              </div>
              {error && (
                <Typography className={error && s.error} variant={'body1'}>
                  {error.message}
                </Typography>
              )}
            </div>
          )}
        />
        <Button fullWidth variant={'primary'}>
          {'Sign Up'}
        </Button>
        <Typography variant={'body1'}>{'Do You have account ?'}</Typography>
        <Typography as={Link} href={'/signin'} variant={'link1'}>
          {'Sign-In'}
        </Typography>
      </form>
    </Card>
  )
}
