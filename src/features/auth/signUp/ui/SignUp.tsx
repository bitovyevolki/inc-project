import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useSignUpMutation } from '@/src/features/auth/service/auth.service'
import { SignUpFormValues, useSignUpForm } from '@/src/features/auth/signUp/model/signUpSchema'
import { SignUpModal } from '@/src/features/auth/signUp/ui/signUp/sign-up-modal/SignUpModal'
import { Button, Card, FormCheckbox, FormInput, Typography } from '@bitovyevolki/ui-kit-int'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

import s from './signUp.module.scss'

import { SocialsRegisterLogin } from '../../socialsRegisterLogin/SocialsRegisterLogin'
type SignUpFormProps = {
  locale: string
  messages: any
}
export const SignUpForm = ({ locale }: SignUpFormProps) => {
  const t = useTranslations('Signup')
  const isRussian = locale === 'ru'
  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    reset,
  } = useSignUpForm(locale === 'ru' ? 'ru' : 'en')

  const userEmail = getValues('email')

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [signUp, isLoading] = useSignUpMutation()
  const onModalClose = () => {
    setIsModalOpen(false)
    reset()
  }

  const sendHandler: SubmitHandler<SignUpFormValues> = async data => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
        userName: data.userName,
      }).unwrap()

      setIsModalOpen(true)
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
                label={`${t('Username')}`}
                name={'userName'}
                placeholder={`${t('Username')}`}
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

            <Button disabled={!isValid} fullWidth type={'submit'} variant={'primary'}>
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
