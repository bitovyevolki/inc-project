import { Button, ModalWindow, Typography } from '@bitovyevolki/ui-kit-int'

import s from './signupmodal.module.scss'
export type SignUpModalProps = {
  onClose: (open: boolean) => void
  open: boolean
  userEmail: string
}
export const SignUpModal = ({ onClose, open, userEmail }: SignUpModalProps) => {
  return (
    <ModalWindow onOpenChange={onClose} open={open} title={'Email sent'}>
      <div className={s.content}>
        <Typography variant={'body1'}>{'We have send a link to confirm your email to'}</Typography>
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
