import { useMeQuery } from '@/src/features/auth/service/auth.service'
import { PublicPosts } from '@/src/features/home/public-posts/PublicPosts'
import { GetLastCreatedPostsResponse } from '@/src/features/post/model/posts.service.types'

type HomePageProps = {
  posts: GetLastCreatedPostsResponse
}

export const HomePage = ({ posts }: HomePageProps) => {
  const { data: me } = useMeQuery()
  const isAuthorized = !!me

  if (isAuthorized) {
    return <div>{'Тут будет профиль или все посты в зависимости от FLOW'}</div>
  }

  return <PublicPosts posts={posts} />
}

export default HomePage
