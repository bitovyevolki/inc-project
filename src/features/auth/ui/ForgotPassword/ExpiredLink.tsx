import * as React from 'react'
import { useState } from 'react'

import { Button, ModalWindow, Typography } from '@bitovyevolki/ui-kit-int'
import { Inter } from 'next/font/google'
import Image from 'next/image'

import s from './restorePassword.module.scss'

import time from '../../../../../public/rafiki.svg'

const inter = Inter({ subsets: ['latin'] })

const ExpiredLink = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
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
        <Button fullWidth onClick={openModal} variant={'primary'}>
          Resend link
        </Button>
      </div>
      <div>
        <Image alt={'time-management'} height={352} src={time} width={474} />
      </div>
      {isModalOpen && <Modal onOpenStateChange={closeModal} open={isModalOpen} />}
    </div>
  )
}

type ModalProps = {
  onOpenStateChange: () => void
  open: boolean
}

const Modal = ({ onOpenStateChange, open }: ModalProps) => {
  return (
    <ModalWindow onOpenChange={onOpenStateChange} open={open} title={'Email sent'}>
      <div className={s.card}>
        <Typography as={'p'} variant={'body1'}>
          We have sent a link to confirm your email to epam@epam.com
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
