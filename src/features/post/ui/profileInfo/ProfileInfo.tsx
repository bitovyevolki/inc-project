import { useEffect } from 'react'

import { Loader } from '@/src/shared/ui/loader/Loader'
import { Typography } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import s from './ProfileInfo.module.scss'

import { useGetAllUsersQuery } from '../../model/follow.service'
import baseUserPhoto from './../../../../../public/image/default-post.png'
import { MyBtn } from './buttons/myBtn/MyBtn'
import { UserBtn } from './buttons/userBtn/UserBtn'

type Props = {
  meId: number
  userName: string
}

export const ProfileInfo = ({ meId, userName }: Props) => {
  const t = useTranslations('UserProfile')

  const { data: profile, isFetching: isFetchingProfile } = useGetAllUsersQuery({
    userName: userName,
  })

  if (!profile) {
    return <Loader />
  }

  const isMyProfile = meId === profile.id

  return (
    <div className={s.userPresentation}>
      <div className={s.userAvatar}>
        <Image
          alt={'avatar'}
          fill
          sizes={'(max-width: 768px) 100vw, 250px'}
          src={(profile.avatars[0]?.url as string) || baseUserPhoto}
        />
      </div>
      <div className={s.info}>
        {isMyProfile ? (
          <MyBtn userName={profile.userName} />
        ) : (
          <UserBtn
            isFetchingProfile
            isFollowing={profile.isFollowing}
            userId={profile.id}
            userName={profile.userName}
          />
        )}
        <div className={s.followers}>
          <div>
            <div>{profile.followingCount}</div>
            <div>{t('following')}</div>
          </div>
          <div>
            <div>{profile.followersCount}</div>
            <div>{t('followers')}</div>
          </div>
          <div>
            <div>{profile.publicationsCount}</div>
            <div>{t('publications')}</div>
          </div>
        </div>
        <div className={s.desc}>
          <Typography as={'p'} variant={'body1'}>
            {profile.aboutMe}
          </Typography>
        </div>
      </div>
    </div>
  )
}
