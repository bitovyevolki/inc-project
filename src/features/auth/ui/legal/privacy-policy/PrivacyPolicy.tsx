import { Typography } from '@bitovyevolki/ui-kit-int'

import s from './privacy-policy.module.scss'

export type PrivacyPolicyProps = {
  text: string
}
export const PrivacyPolicy = ({ text }: PrivacyPolicyProps) => {
  return (
    <div className={s.root}>
      <Typography variant={'h1'}>{'Privacy Policy'}</Typography>
      <Typography variant={'body2'}>{text}</Typography>
    </div>
  )
}
