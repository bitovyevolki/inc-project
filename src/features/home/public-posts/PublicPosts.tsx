import { FC } from 'react'

import { PublicPostItem } from '@/src/features/home/public-posts/public-post-item/PublicPostItem'
import { TotalUsersCount } from '@/src/features/home/total-users-count/TotalUsersCount'
import { GetLastCreatedPostsResponse, Post } from '@/src/features/post/model/posts.service.types'

import s from './PublicPosts.module.scss'

interface PublicPostsProps {
  posts: GetLastCreatedPostsResponse
}

export const PublicPosts: FC<PublicPostsProps> = ({ posts }: PublicPostsProps) => {
  if (!posts || posts.items.length === 0) {
    return <div>Посты не найдены.</div>
  }

  return (
    <div className={s.root}>
      <TotalUsersCount usersCount={posts?.totalUsers} />
      <div className={s.postsWrapper}>
        {posts?.items.map(post => <PublicPostItem key={post.id} post={post} />)}
      </div>
    </div>
  )
}
