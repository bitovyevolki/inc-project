import { ComponentPropsWithoutRef, SVGProps, useEffect, useRef } from 'react'

import { Typography } from '@bitovyevolki/ui-kit-int'

import s from './Alert.module.scss'

export type AlertVariantType = 'error' | 'success'

export type IAlert = {
  close?: () => void
  isShow: boolean
  text: string
  variant: AlertVariantType
} & ComponentPropsWithoutRef<'div'>

export const Alert = ({ close, isShow, text, variant, ...rest }: IAlert) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      close && close()
    }, 2000)

    return () => clearInterval(timerRef.current)
  }, [close])

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

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'24'}
    viewBox={'0 0 24 24'}
    width={'24'}
    {...props}
    xmlns={'http://www.w3.org/2000/svg'}
  >
    <g clipPath={'url(#clip0_5661_1700)'}>
      <path
        d={
          'M13.41 12L17.71 7.71C17.8983 7.5217 18.0041 7.2663 18.0041 7C18.0041 6.7337 17.8983 6.47831 17.71 6.29C17.5217 6.1017 17.2663 5.99591 17 5.99591C16.7337 5.99591 16.4783 6.1017 16.29 6.29L12 10.59L7.71 6.29C7.5217 6.1017 7.2663 5.99591 7 5.99591C6.7337 5.99591 6.4783 6.1017 6.29 6.29C6.1017 6.47831 5.99591 6.7337 5.99591 7C5.99591 7.2663 6.1017 7.5217 6.29 7.71L10.59 12L6.29 16.29C6.19627 16.383 6.12188 16.4936 6.07111 16.6154C6.02034 16.7373 5.9942 16.868 5.9942 17C5.9942 17.132 6.02034 17.2627 6.07111 17.3846C6.12188 17.5064 6.19627 17.617 6.29 17.71C6.38296 17.8037 6.49356 17.8781 6.61542 17.9289C6.73728 17.9797 6.86799 18.0058 7 18.0058C7.13201 18.0058 7.26272 17.9797 7.38458 17.9289C7.50644 17.8781 7.61704 17.8037 7.71 17.71L12 13.41L16.29 17.71C16.383 17.8037 16.4936 17.8781 16.6154 17.9289C16.7373 17.9797 16.868 18.0058 17 18.0058C17.132 18.0058 17.2627 17.9797 17.3846 17.9289C17.5064 17.8781 17.617 17.8037 17.71 17.71C17.8037 17.617 17.8781 17.5064 17.9289 17.3846C17.9797 17.2627 18.0058 17.132 18.0058 17C18.0058 16.868 17.9797 16.7373 17.9289 16.6154C17.8781 16.4936 17.8037 16.383 17.71 16.29L13.41 12Z'
        }
        fill={'white'}
      />
    </g>
    <defs>
      <clipPath id={'clip0_5661_1700'}>
        <rect fill={'white'} height={'24'} width={'24'} />
      </clipPath>
    </defs>
  </svg>
)
