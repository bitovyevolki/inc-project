import { ProfileData } from '@/src/features/post/model/posts.service.types'
import { Button, Typography } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'

import s from './profileBtn.module.scss'

interface ProfileBtnProps {
  profileData: ProfileData | undefined
  showSettingsButton: boolean
}

export const ProfileBtn = ({ profileData, showSettingsButton }: ProfileBtnProps) => {
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
        {showSettingsButton && (
          // @ts-ignore
          <Button
            as={Link}
            className={s.settingsButton}
            href={`/personal-info`}
            variant={'primary'}
          >
            Profile Settings
          </Button>
        )}
      </div>
    </div>
  )
}
