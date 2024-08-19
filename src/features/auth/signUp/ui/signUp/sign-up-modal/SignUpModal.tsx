import { Button, ModalWindow, Typography } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'

import s from './signupmodal.module.scss'
export type SignUpModalProps = {
  onClose: (open: boolean) => void
  open: boolean
  userEmail: string
}
export const SignUpModal = ({ onClose, open, userEmail }: SignUpModalProps) => {
  const t = useTranslations('Signup')

  return (
    <ModalWindow onOpenChange={onClose} open={open} title={`${t('Email sent')}`}>
      <div className={s.content}>
        <Typography variant={'body1'}>{`${t('signUpModalMessage')}`}</Typography>
        <Typography variant={'body1'}>{userEmail}</Typography>
        <div className={s.buttonWrapper}>
          <Button onClick={onClose} variant={'primary'}>
            {'Ok'}
          </Button>
        </div>
      </div>
    </ModalWindow>
  )
}
