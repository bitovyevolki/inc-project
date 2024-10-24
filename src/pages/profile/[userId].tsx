import { PropsWithChildren } from 'react'

import { IProfile } from '@/src/entities/profile/userProfile/model/types/profile'
import { Post } from '@/src/features/post/model/posts.service.types'
import { Profile } from '@/src/features/post/ui/profile/Profile'
import { GetServerSideProps } from 'next'

function ProfilePage(props: { post: Post | null; profile: IProfile }) {
  const userId = props.profile?.id?.toString()

  return <Profile profileId={userId} {...props} />
}

export default function ProfilePageProtected({
  post,
  profile,
}: { post: Post | null; profile: IProfile } & PropsWithChildren) {
  return <ProfilePage post={post} profile={profile} />
}

export const getServerSideProps: GetServerSideProps = async context => {
  const query = context.query
  const userId = query?.userId
  let post = null
  let profile = null

  if (userId) {
    const response = await fetch(`https://inctagram.work/api/v1/public-user/profile/${userId}`)

    profile = await response.json()
  }

  if (query.postId) {
    const response = await fetch(`https://inctagram.work/api/v1/public-posts/${query.postId}`)

    post = await response.json()
  }

  const locale = context.req.cookies['next-language'] || 'en'
  const messages = (await import(`../../locales/${locale}.json`)).default

  return {
    props: {
      messages,
      post,
      profile,
    },
  }
}
