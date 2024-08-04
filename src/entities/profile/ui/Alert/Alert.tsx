import { ComponentPropsWithoutRef } from 'react'

import { Typography } from '@bitovyevolki/ui-kit-int'

import s from './Alert.module.scss'

import { CloseIcon } from '../Icons/Icons'

export type AlertVariantType = 'error' | 'success'

export type IAlert = {
  close?: () => void
  isShow: boolean
  text: string
  variant: AlertVariantType
} & ComponentPropsWithoutRef<'div'>

export const Alert = ({ close, isShow, text, variant, ...rest }: IAlert) => {
  return (
    <div className={`${s.alert} ${s[variant]} ${isShow ? s.show : s.hide}`} {...rest}>
      {variant === 'error' && (
        <>
          <Typography className={s.title} variant={'subTitle1'}>
            Error!
          </Typography>

          <Typography variant={'body1'}>{text}</Typography>
        </>
      )}

      {variant === 'success' && (
        <>
          <Typography className={s.title} variant={'subTitle1'}>
            Success!
          </Typography>

          <Typography variant={'body1'}>{text}</Typography>
        </>
      )}
      {close && (
        <div className={s.close} onClick={close}>
          <CloseIcon />
        </div>
      )}
    </div>
  )
}
