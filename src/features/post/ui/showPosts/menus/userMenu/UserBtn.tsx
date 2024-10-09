import { useState } from 'react'

import { Button, Typography } from '@bitovyevolki/ui-kit-int'

import s from './userBnt.module.scss'

interface profileDataProps {
  profileData: any
}

export const UserBtn = ({ profileData }: profileDataProps) => {
  const [follow, setFollow] = useState(false)

  const handlerChange = () => {
    setFollow(!follow)
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
