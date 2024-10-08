import { Button, Typography } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'
import s from './profileBtn.module.scss'

interface profileDataProps {
  profileData: any
  showSettingsButton: any
}

export const ProfileBtn = ({ profileData, showSettingsButton }: profileDataProps) => {
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
