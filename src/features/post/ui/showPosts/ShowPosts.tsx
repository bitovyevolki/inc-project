import * as React from 'react'

import { useGetProfileByIdQuery } from '@/src/entities/profile/api/profile.service'
import { GetProfileByIdArgs } from '@/src/entities/profile/model/types/profile'
import {
  useGetPostsByUserNameQuery,
  useGetPublicPostsByUserIdQuery,
} from '@/src/features/post/model/posts.service'
import { ProfileIntro } from '@/src/features/post/ui/profileIntro/ProfileIntro'
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

  const userName = profileData?.userName as string
  const userId = profileData?.id as number

  const { data: postsData } = useGetPostsByUserNameQuery({ userName })

  const { data: publicPostsData } = useGetPublicPostsByUserIdQuery({ userId })

  const showPosts = publicPostsData?.items

  return (
    <div>
      <ProfileIntro avatarSize={'large'} avatars={profileData?.avatars} userName={userName} />
      <Typography as={'p'} variant={'body1'}>
        {profileData?.aboutMe}
      </Typography>
      {/*  @ts-ignore*/}
      <Button as={Link} href={`/personal-info`}>
        Profile Settings
      </Button>
      <div className={s.postsGallery}>
        {showPosts?.map(post => (
          <div key={post.id}>
            <img alt={'post image'} src={post?.images?.[0]?.url} width={300} />
          </div>
        ))}
      </div>
    </div>
  )
}
