import { ReactElement } from 'react'

import { useMeQuery } from '@/src/features/auth/service/auth.service'
import { PublicPosts } from '@/src/features/home/public-posts/PublicPosts'
import { Layout } from '@/src/shared/ui/Layout/Layout'

const HomePage = () => {
  const { data: me } = useMeQuery()
  const isAuthorized = !!me

  if (isAuthorized) {
    return <div>{'Тут будет профиль или все посты в зависимости от FLOW'}</div>
  }

  return <PublicPosts />
}

export default HomePage
