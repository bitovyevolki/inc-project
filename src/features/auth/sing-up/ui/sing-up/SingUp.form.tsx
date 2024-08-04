import { SignUpFormValues, useSignUpForm } from '@/src/features/auth/sing-up/model/singUpSchema'
import { GitHubIcon } from '@/src/shared/assets/icons/github'
import { GoogleIcon } from '@/src/shared/assets/icons/google'
import { Button, Card, FormCheckbox, FormInput, Typography } from '@bitovyevolki/ui-kit-int'

import s from './singUp.form.module.scss'

export type SingUpFormProps = {
  onSubmit: (data: FormData) => void
}
export const SignUpForm = ({ onSubmit }: SingUpFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useSignUpForm()

  const sendHandler = (data: SignUpFormValues) => {
    const formData = new FormData()

    formData.append('userName', data.userName)
    formData.append('email', data.email)
    formData.append('password', data.password ?? '')
    formData.append('baseUrl', 'http://localhost:3000')
    onSubmit(formData)
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
          <FormInput
            control={control}
            label={'User Name'}
            name={'userName'}
            placeholder={'User Name'}
            type={'text'}
          />
        </div>
        <div className={s.inputWrapper}>
          <FormInput
            control={control}
            label={'Email'}
            name={'email'}
            placeholder={'Email'}
            type={'email'}
          />
        </div>
        <div className={s.inputWrapper}>
          <FormInput
            control={control}
            label={'Password'}
            name={'password'}
            placeholder={'Password'}
            type={'password'}
          />
        </div>
        <div className={s.inputWrapper}>
          <FormInput
            control={control}
            label={'Confirm Password'}
            name={'confirmPassword'}
            placeholder={'Confirm Password'}
            type={'password'}
          />
        </div>
        <div className={s.agreeBlock}>
          <div className={s.checkBoxWrapper}>
            <FormCheckbox control={control} label={'I agree to the'} name={'agreeToTerms'} />
            <Typography as={'a'} href={'/terms-of-service'} variant={'link1'}>
              {'Terms of Service'}
            </Typography>
            <Typography variant={'body2'}>{'and'}</Typography>
            <Typography as={'a'} href={'/privacy-policy'} variant={'link1'}>
              {'Privacy Policy'}
            </Typography>
          </div>
          {errors.agreeToTerms && (
            <Typography className={errors && s.error} variant={'body1'}>
              {errors.agreeToTerms.message}
            </Typography>
          )}
        </div>

        <Button fullWidth variant={'primary'}>
          {'Sign Up'}
        </Button>
        <div className={s.loginLink}>
          <Typography variant={'subTitle1'}>{'Do You have an account ?'}</Typography>
          <Typography as={'a'} className={s.link} href={'/signin'} variant={'subTitle1'}>
            {'Sign-In'}
          </Typography>
        </div>
      </form>
    </Card>
  )
}
