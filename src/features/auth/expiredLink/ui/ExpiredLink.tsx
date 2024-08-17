import * as React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { useResendEmailMutation } from '@/src/features/auth/service/auth.service'
import { ServerError } from '@/src/features/auth/service/auth.types'
import { TimeRafikiIcon } from '@/src/shared/assets/icons/timeRafiki'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Button, ModalWindow, Typography } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'

import s from './expiredLink.module.scss'

type Props = {
  email: string
}

export const ExpiredLink = ({ email }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [resendEmail, { error, isError, isLoading, isSuccess }] = useResendEmailMutation()
  const serverError = (error as ServerError)?.data?.messages[0]?.message

  const t = useTranslations('ExpiredLink')

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const onResendLink = async () => {
    await resendEmail({ email })
    setIsModalOpen(true)
  }

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    toast.error(serverError)
  }

  return (
    <>
      {isSuccess && (
        <ModalWindow onOpenChange={closeModal} open={isModalOpen} title={t('ModalTitle')}>
          <div className={s.card}>
            <Typography as={'p'} variant={'body1'}>
              {`${t('sentLinkConfirmationMessage')} ${email}`}
            </Typography>
            <Button className={s.buttonRight} onClick={closeModal} variant={'primary'}>
              {t('OK')}
            </Button>
          </div>
        </ModalWindow>
      )}
      <div className={s.wrapper}>
        <div className={s.card}>
          <Typography as={'h1'} className={s.accentColor} variant={'h2'}>
            {t('ExpiredLinkTitle')}
          </Typography>
          <Typography as={'p'} className={s.accentColor} variant={'body1'}>
            {t('ExpiredLinkMessage')}
          </Typography>
          <Button fullWidth onClick={onResendLink} variant={'primary'}>
            {t('ResendLinkButton')}
          </Button>
        </div>
        <TimeRafikiIcon />
      </div>
    </>
  )
}
