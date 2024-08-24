import * as React from 'react'

import { useGetProfileByIdQuery } from '@/src/entities/profile/api/profile.service'
import { GetProfileByIdArgs } from '@/src/entities/profile/model/types/profile'
import { useGetPostsByUserNameQuery } from '@/src/features/post/model/posts.service'
import { ProfileIntro } from '@/src/features/post/ui/userCredentials/ProfileIntro'
import { Button, Typography } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'

import s from './showPosts.module.scss'

type Props = {
  profileId?: string
}
export const ShowPosts = ({ profileId }: Props) => {
  const { data: profileData, isLoading: LoadingProfile } = useGetProfileByIdQuery({
    profileId,
  } as GetProfileByIdArgs)

  const username = profileData?.userName

  const { data: postsData } = useGetPostsByUserNameQuery({ username })

  return (
    <div>
      <ProfileIntro avatarSize={'large'} avatars={profileData?.avatars} userName={username} />
      <Typography as={'p'} variant={'body1'}>
        {profileData?.aboutMe}
      </Typography>
      <Button as={Link} href={`/personal-info`}>
        Profile Settings
      </Button>
      <div className={s.postsGallery}></div>
    </div>
  )
}
