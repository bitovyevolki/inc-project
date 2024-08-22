import * as React from 'react'

import { Typography } from '@bitovyevolki/ui-kit-int'

import s from './userCredentials.module.scss'

export const UserCredentials = () => {
  return (
    <div className={s.container}>
      <div className={s.userAvatar}></div>
      <div className={s.userName}>
        <Typography as={'h6'} variant={'body1'}>
          UserName
        </Typography>
      </div>
    </div>
  )
}
