export type AlertVariantType = 'error' | 'success'

import { Typography } from '@bitovyevolki/ui-kit-int'

import s from './Alert.module.scss'

interface IAlert {
  text: string
  variant: AlertVariantType
}

export const Alert = ({ text, variant }: IAlert) => {
  return (
    <div className={`${s.alert} ${variant === 'error' ? s.error : ''}`}>
      {variant === 'error' && (
        <>
          <Typography className={s.title} variant={'subTitle1'}>
            Error!
          </Typography>

          <Typography variant={'body1'}>{text}</Typography>
        </>
      )}
    </div>
  )
}
