import { useMeQuery } from '@/src/features/auth/service/auth.service'
import { PublicPosts } from '@/src/features/home/public-posts/PublicPosts'
import { GetLastCreatedPostsResponse } from '@/src/features/post/model/posts.service.types'

import { FollowersPosts } from './followers-posts/ui/FollowersPosts'

type HomePageProps = {
  posts: GetLastCreatedPostsResponse
}

export const HomePage = ({ posts }: HomePageProps) => {
  const { data: me } = useMeQuery()
  const isAuthorized = !!me

  if (isAuthorized) {
    return <FollowersPosts />
  }

  return <PublicPosts posts={posts} />
}
