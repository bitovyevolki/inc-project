import { RoundLoader } from '@/src/shared/ui/RoundLoader/RoundLoader'
import { Typography } from '@bitovyevolki/ui-kit-int'

import s from './FollowersPosts.module.scss'

import { useGetFollowersPostsQuery } from '../api/followers-posts.service'
import { FollowersPostsItem } from './followers-posts-item/FollowersPostsItem'

export const FollowersPosts = () => {
  const { data, error, isLoading } = useGetFollowersPostsQuery({})

  if (error) {
    return <Typography variant={'h2'}>Ошибка загрузки публикаций</Typography>
  }

  if (data?.items.length === 0) {
    return <Typography variant={'h2'}>У ваших пользователей еще нет публикаций</Typography>
  }

  if (isLoading) {
    return (
      <div className={s.loader}>
        <RoundLoader variant={'large'} />
      </div>
    )
  }

  return (
    <div className={s.posts}>
      {data?.items.map(p => <FollowersPostsItem item={p} key={p.id + '-' + Math.random()} />)}
    </div>
  )
}
