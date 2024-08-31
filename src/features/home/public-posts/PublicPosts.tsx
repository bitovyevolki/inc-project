import { PostItem } from '@/src/features/home/public-posts/post-item/PostItem'
import { useGetPublicPostsAllQuery } from '@/src/features/post/model/posts.service'

import s from './PublicPosts.module.scss'

export const PublicPosts = () => {
  const { data, error, isLoading } = useGetPublicPostsAllQuery({ pageSize: 4 })

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (!data || !data.items || data.items.length === 0) {
    return <div>Посты не найдены.</div>
  }

  return (
    <div className={s.root}>
      <div>{'Total Users Count'}</div>
      <div className={s.postsWrapper}>
        {data.items.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
