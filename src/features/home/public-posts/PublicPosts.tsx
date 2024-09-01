import { PublicPostItem } from '@/src/features/home/public-posts/public-post-item/PublicPostItem'
import { TotalUsersCount } from '@/src/features/home/total-users-count/TotalUsersCount'
import { useGetPublicPostsAllQuery } from '@/src/features/post/model/posts.service'
import { Loader } from '@/src/shared/ui/loader/Loader'

import s from './PublicPosts.module.scss'

export const PublicPosts = () => {
  const { data, error, isLoading } = useGetPublicPostsAllQuery({ pageSize: 50 })

  if (isLoading) {
    return <Loader />
  }

  if (!data || !data.items || data.items.length === 0) {
    return <div>Посты не найдены.</div>
  }

  return (
    <div className={s.root}>
      <TotalUsersCount usersCount={data.totalUsers} />
      <div className={s.postsWrapper}>
        {data.items.map(post => (
          <PublicPostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
