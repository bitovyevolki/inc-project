import * as React from 'react'
import { useState } from 'react'

import { useResendEmailMutation } from '@/src/features/auth/service/auth.service'
import { Button, ModalWindow, Typography } from '@bitovyevolki/ui-kit-int'
import { Inter } from 'next/font/google'
import Image from 'next/image'

import s from './expiredLink.module.scss'

import time from '../../../../../public/rafiki.svg'

const inter = Inter({ subsets: ['latin'] })

export type ExpiredLinkProps = {
  email: string
}
const ExpiredLink = ({ email }: ExpiredLinkProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [resendEmail, { isLoading, isSuccess }] = useResendEmailMutation()
  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleOnResendLink = async () => {
    try {
      await resendEmail({
        email: email,
      }).unwrap()
      if (isSuccess) {
        setIsModalOpen(true)
      }
    } catch (error: any) {
      console.log(error.data.messages[0].message)
    }
  }

  if (isLoading) {
    return <Typography variant={'body2'}>{'Loading .....'}</Typography>
  }

  return (
    <div className={s.wrapper}>
      <div className={s.card}>
        <Typography as={'h1'} className={s.accentColor} variant={'h2'}>
          Email verification link expired
        </Typography>
        <Typography as={'p'} className={s.accentColor} variant={'body1'}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </Typography>
        <Button fullWidth onClick={handleOnResendLink} variant={'primary'}>
          Resend link
        </Button>
      </div>
      <div>
        <Image alt={'time-management'} height={352} src={time} width={474} />
      </div>
      {isModalOpen && <Modal email={email} onOpenStateChange={closeModal} open={isModalOpen} />}
    </div>
  )
}

type ModalProps = {
  email: string
  onOpenStateChange: () => void
  open: boolean
}

const Modal = ({ email, onOpenStateChange, open }: ModalProps) => {
  return (
    <ModalWindow onOpenChange={onOpenStateChange} open={open} title={'Email sent'}>
      <div className={s.card}>
        <Typography as={'p'} variant={'body1'}>
          {` We have sent a link to confirm your email to ${email}`}
        </Typography>
        <Button
          as={'a'}
          className={s.buttonRight}
          href={'/create-new-password'}
          variant={'primary'}
        >
          OK
        </Button>
      </div>
    </ModalWindow>
  )
}

export default ExpiredLink
