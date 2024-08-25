import * as React from 'react'

import { IProfile } from '@/src/entities/profile/model/types/profile'
import { Typography } from '@bitovyevolki/ui-kit-int'
import clsx from 'clsx'

import s from './profileIntro.module.scss'

type Props = {
  avatarSize?: 'large' | 'small'
  avatars?: IProfile['avatars']
  userName?: string
}

export const ProfileIntro = ({ avatarSize = 'small', avatars, userName }: Props) => {
  if (!avatars) {
    return null
  }
  const [avatarLarge, avatarSmall] = avatars

  const avatarSelected = avatarSize === 'small' ? avatarSmall : avatarLarge

  return (
    <div className={s.container}>
      <div className={clsx(s.userAvatar, avatarSize === 'small' ? s.sizeS : s.sizeL)}>
        <img alt={'profile avatar'} src={avatarSelected?.url} />
      </div>
      <div className={s.userName}>
        <Typography as={'h6'} variant={'body1'}>
          {userName}
        </Typography>
      </div>
    </div>
  )
}
