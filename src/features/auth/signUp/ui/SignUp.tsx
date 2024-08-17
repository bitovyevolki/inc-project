import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useSignUpMutation } from '@/src/features/auth/service/auth.service'
import { SignUpFormValues, useSignUpForm } from '@/src/features/auth/signUp/model/signUpSchema'
import { SignUpModal } from '@/src/features/auth/signUp/ui/signUp/sign-up-modal/SignUpModal'
import { SocialsRegisterLogin } from '@/src/features/auth/socialsRegisterLogin/SocialsRegisterLogin'
import { Button, Card, FormCheckbox, FormInput, Typography } from '@bitovyevolki/ui-kit-int'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

import s from './signUp.module.scss'
type SignUpFormProps = {
  locale: string
  messages: any
}
export const SignUpForm = ({ locale }: SignUpFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useSignUpForm()

  const t = useTranslations('Signup')
  const isRussian = locale === 'ru'

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
      toast.error(error.data.messages[0].message)
    }
  }

  return (
    <div className={s.wrapper}>
      {!isModalOpen && (
        <Card className={s.card}>
          <Typography as={'h1'} variant={'h1'}>
            {`${t('Sign-Up')}`}
          </Typography>
          <SocialsRegisterLogin />
          <form className={s.form} onSubmit={handleSubmit(sendHandler)}>
            <div className={s.inputWrapper}>
              <FormInput
                control={control}
                label={`${t('User Name')}`}
                name={'userName'}
                placeholder={`${t('User Name')}`}
                type={'text'}
              />
            </div>
            <div className={s.inputWrapper}>
              <FormInput
                control={control}
                label={`${t('Email')}`}
                name={'email'}
                placeholder={`${t('Email')}`}
                type={'email'}
              />
            </div>
            <div className={s.inputWrapper}>
              <FormInput
                control={control}
                label={`${t('Password')}`}
                name={'password'}
                placeholder={`${t('Password')}`}
                type={'password'}
              />
            </div>
            <div className={s.inputWrapper}>
              <FormInput
                control={control}
                label={`${t('Confirm Password')}`}
                name={'confirmPassword'}
                placeholder={`${t('Confirm Password')}`}
                type={'password'}
              />
            </div>
            <div className={s.agreeBlock}>
              <div className={clsx(s.checkBoxWrapper, isRussian && s.russianLang)}>
                <FormCheckbox
                  control={control}
                  label={`${t('I agree to the')}`}
                  name={'agreeToTerms'}
                />
                <Typography as={'a'} href={'/terms-of-service'} variant={'link1'}>
                  {`${t('Terms of Service')}`}
                </Typography>
                <Typography variant={'body2'}>{`${t('and')}`}</Typography>
                <Typography as={'a'} href={'/privacy-policy'} variant={'link1'}>
                  {`${t('Privacy Policy')}`}
                </Typography>
              </div>
              {errors.agreeToTerms && (
                <Typography className={errors && s.error} variant={'caption'}>
                  {errors.agreeToTerms.message}
                </Typography>
              )}
            </div>

            <Button fullWidth variant={'primary'}>
              {`${t('Sign Up')}`}
            </Button>
            <div className={s.loginLink}>
              <Typography variant={'subTitle1'}>{`${t('Do You have an account ?')}`}</Typography>
              <Typography as={'a'} className={s.link} href={'/auth/sign-in'} variant={'subTitle1'}>
                {`${t('Sign-In')}`}
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
