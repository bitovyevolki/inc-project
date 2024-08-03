import { Typography } from '@bitovyevolki/ui-kit-int'

import s from './terms-of-service.module.scss'

export type TermsOfServiceProps = {
  text: string
}
export const TermsOfService = ({ text }: TermsOfServiceProps) => {
  return (
    <div className={s.root}>
      <Typography variant={'h1'}>{'Terms Of Service'}</Typography>
      <Typography variant={'body2'}>{text}</Typography>
    </div>
  )
}
