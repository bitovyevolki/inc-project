import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

import { useSignUpMutation } from '@/src/features/auth/service/auth.service'
import { SignUpFormValues, useSignUpForm } from '@/src/features/auth/signUp/model/signUpSchema'
import { SignUpModal } from '@/src/features/auth/signUp/ui/signUp/sign-up-modal/SignUpModal'
import { GitHubIcon } from '@/src/shared/assets/icons/github'
import { GoogleIcon } from '@/src/shared/assets/icons/google'
import { Button, Card, FormCheckbox, FormInput, Typography } from '@bitovyevolki/ui-kit-int'

import s from './signUp.module.scss'

import { SocialsRegisterLogin } from '../../socialsRegisterLogin/SocialsRegisterLogin'

export const SignUpForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useSignUpForm()

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [userEmail, setUserEmail] = useState<string>('')
  const [signUp, isLoading] = useSignUpMutation()
  const onModalClose = () => {
    setIsModalOpen(prev => !prev)
    setUserEmail('')
  }

  const sendHandler: SubmitHandler<SignUpFormValues> = async data => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
        userName: data.userName,
      }).unwrap()

      setUserEmail(data.email)
      setIsModalOpen(true)
      reset()
    } catch (error: any) {
      alert(JSON.stringify(error))
    }
  }

  return (
    <div className={s.wrapper}>
      {!isModalOpen && (
        <Card className={s.card}>
          <Typography as={'h1'} variant={'h1'}>
            {'Sing-Up'}
          </Typography>
          <SocialsRegisterLogin />
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
                <Typography className={errors && s.error} variant={'caption'}>
                  {errors.agreeToTerms.message}
                </Typography>
              )}
            </div>

            <Button fullWidth variant={'primary'}>
              {'Sign Up'}
            </Button>
            <div className={s.loginLink}>
              <Typography variant={'subTitle1'}>{'Do You have an account ?'}</Typography>
              <Typography as={'a'} className={s.link} href={'/auth/sign-in'} variant={'subTitle1'}>
                {'Sign-In'}
              </Typography>
            </div>
          </form>
        </Card>
      )}
      {isModalOpen && (
        <SignUpModal onClose={onModalClose} open={isModalOpen} userEmail={userEmail ?? ''} />
      )}
    </div>
  )
}
