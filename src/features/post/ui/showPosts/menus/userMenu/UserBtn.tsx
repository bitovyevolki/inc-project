import { useState } from 'react'

import { ProfileData } from '@/src/features/post/model/posts.service.types'
import { Button, Typography } from '@bitovyevolki/ui-kit-int'

import s from './userBnt.module.scss'

interface ProfileBtnProps {
  profileData: ProfileData | undefined
}

export const UserBtn = ({ profileData }: ProfileBtnProps) => {
  const [follow, setFollow] = useState(false)

  const handlerChange = () => {
    setFollow(!follow)
  }

  if (!profileData) {
    return null // Если profileData undefined, возвращаем null
  }

  return (
    <div className={s.profile}>
      <div className={s.text}>
        <Typography as={'p'} className={s.userName} variant={'h3'}>
          {profileData?.userName}
        </Typography>
      </div>
      <div className={s.bnts}>
        {follow ? (
          <Button onClick={handlerChange} variant={'outlined'}>
            Unfollow
          </Button>
        ) : (
          <Button onClick={handlerChange} variant={'primary'}>
            Follow
          </Button>
        )}
        <Button variant={'secondary'}>Send Message</Button>
      </div>
    </div>
  )
}
