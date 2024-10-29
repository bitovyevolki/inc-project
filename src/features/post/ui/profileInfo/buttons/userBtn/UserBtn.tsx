import { toast } from 'react-toastify'

import {
  useFollowUserMutation,
  useUnFollowMutation,
} from '@/src/features/post/model/follow.service'
import { useParamsHook } from '@/src/shared/hooks/useParamsHook'
import { Button, Typography } from '@bitovyevolki/ui-kit-int'
import { useRouter } from 'next/router'
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
  const router = useRouter()

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
      toast.error('Ошибка отписки')
    }
  }

  const handleSendMessage = () => {
    router.push(`/messenger?partnerId=${userId}`)
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
        <Button disabled={isLoading} onClick={handleSendMessage} variant={'secondary'}>
          {t('send-message')}
        </Button>
      </div>
    </div>
  )
}
