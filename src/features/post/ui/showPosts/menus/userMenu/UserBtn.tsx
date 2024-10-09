import { useEffect, useState } from 'react'
import { ProfileData } from '@/src/features/post/model/posts.service.types'
import { Button, Typography } from '@bitovyevolki/ui-kit-int'
import s from './userBnt.module.scss'
import {
  useDeleteFollowerMutation,
  useFollowUserMutation,
} from '@/src/entities/profile/userProfile/api/following.service'

interface UserBtnProps {
  profileData: ProfileData | undefined
  setFollowerCount: React.Dispatch<React.SetStateAction<number>>
}

export const UserBtn = ({ profileData, setFollowerCount }: UserBtnProps) => {
  const [follow, setFollow] = useState(false)

  const [followUser] = useFollowUserMutation()
  const [unfollowUser] = useDeleteFollowerMutation()

  const handleFollow = async () => {
    if (!profileData) return
    const userId = Number(profileData.id)

    try {
      await followUser({ selectedUserId: userId }).unwrap()
      setFollow(true)
      setFollowerCount(prevCount => prevCount + 1) // Increase follower count
    } catch (error) {
      console.error('Ошибка подписки:', error)
    }
  }

  const handleUnfollow = async () => {
    if (!profileData) return
    const userId = Number(profileData.id)

    try {
      await unfollowUser({ userId }).unwrap()
      setFollow(false)
      setFollowerCount(prevCount => prevCount - 1) // Decrease follower count
    } catch (error) {
      console.error('Ошибка отписки:', error)
    }
  }

  if (!profileData) {
    return null
  }

  return (
    <div className={s.profile}>
      <div className={s.text}>
        <Typography as={'p'} className={s.userName} variant={'h3'}>
          {profileData.userName}
        </Typography>
      </div>
      <div className={s.bnts}>
        {follow ? (
          <Button onClick={handleUnfollow} variant={'outlined'}>
            Unfollow
          </Button>
        ) : (
          <Button onClick={handleFollow} variant={'primary'}>
            Follow
          </Button>
        )}
      </div>
    </div>
  )
}
