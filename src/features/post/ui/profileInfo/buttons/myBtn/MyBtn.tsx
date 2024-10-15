import { ProfileData } from '@/src/features/post/model/posts.service.types'
import { Button, Typography } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import s from './MyBtn.module.scss'

interface ProfileBtnProps {
  userName: string
}

export const MyBtn = ({ userName }: ProfileBtnProps) => {
  const t = useTranslations('UserProfile.buttons')

  return (
    <div className={s.profile}>
      <div className={s.text}>
        <Typography as={'p'} className={s.userName} variant={'h3'}>
          {userName}
        </Typography>
      </div>
      <div className={s.bnts}>
        {/* @ts-ignore */}
        <Button as={Link} className={s.settingsButton} href={`/personal-info`} variant={'primary'}>
          {t('settings')}
        </Button>
      </div>
    </div>
  )
}
