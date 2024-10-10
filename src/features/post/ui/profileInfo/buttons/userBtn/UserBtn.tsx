import {
  useFollowUserMutation,
  useUnFollowMutation,
} from '@/src/features/post/model/follow.service'
import { Button, Typography } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'

import s from './userBnt.module.scss'

type Props = {
  isFetchingProfile: boolean
  isFollowing: boolean
  userId: number
  userName: string
}

export const UserBtn = ({ isFetchingProfile, isFollowing, userId, userName }: Props) => {
  const t = useTranslations('UserProfile.buttons')
  const [followUser, { isLoading: isFollowLoading }] = useFollowUserMutation()
  const [unfollowUser, { isLoading: isUnFollowLoading }] = useUnFollowMutation()

  const handleFollow = async () => {
    try {
      await followUser({ selectedUserId: userId }).unwrap()
    } catch (error) {
      console.error('Ошибка подписки:', error)
    }
  }

  const handleUnfollow = async () => {
    try {
      await unfollowUser({ userId }).unwrap()
    } catch (error) {
      console.error('Ошибка отписки:', error)
      console.log('')
    }
  }

  const isLoading = isFollowLoading || isUnFollowLoading || !isFetchingProfile

  return (
    <div className={s.profile}>
      <div className={s.text}>
        <Typography as={'p'} className={s.userName} variant={'h3'}>
          {userName}
        </Typography>
      </div>
      <div className={s.bnts}>
        {isFollowing ? (
          <Button disabled={isLoading} onClick={handleUnfollow} variant={'outlined'}>
            {t('un-follow')}
          </Button>
        ) : (
          <Button disabled={isLoading} onClick={handleFollow} variant={'primary'}>
            {t('follow')}
          </Button>
        )}
        <Button disabled={isLoading} variant={'secondary'}>
          {t('send-message')}
        </Button>
      </div>
    </div>
  )
}