import { useEffect, useState } from 'react'
import { ProfileData } from '@/src/features/post/model/posts.service.types'
import { Button, Typography } from '@bitovyevolki/ui-kit-int'
import s from './userBnt.module.scss'
import {
  useDeleteFollowerMutation,
  useFollowUserMutation,
} from '@/src/entities/profile/userProfile/api/following.service'

interface ProfileBtnProps {
  profileData: ProfileData | undefined
}

export const UserBtn = ({ profileData }: ProfileBtnProps) => {
  const [follow, setFollow] = useState(false)

  // Хуки для подписки и отписки
  const [followUser] = useFollowUserMutation()
  const [unfollowUser] = useDeleteFollowerMutation()

  // Проверяем, подписан ли текущий пользователь на этого
  // useEffect(() => {
  //   if (profileData?.isFollowed) {
  //     setFollow(true)
  //   } else {
  //     setFollow(false)
  //   }
  // }, [profileData])

  const handleFollow = async () => {
    if (!profileData) return

    const userId = Number(profileData.id) // Приведение к числу
    console.log('User ID:', userId) // Вывод в консоль для отладки

    if (userId <= 0) {
      console.error('Invalid userId:', userId) // Проверка на валидность
      return // Возврат, если userId недопустимый
    }

    try {
      await followUser({ selectedUserId: userId }).unwrap()
      setFollow(true)
    } catch (error) {
      console.error('Ошибка подписки:', error)
    }
  }

  const handleUnfollow = async () => {
    if (!profileData) return

    const userId = Number(profileData.id) // Приведение к числу
    console.log('User ID for unfollow:', userId) // Вывод в консоль для отладки

    if (userId <= 0) {
      console.error('Invalid userId for unfollow:', userId) // Проверка на валидность
      return // Возврат, если userId недопустимый
    }

    try {
      await unfollowUser({ userId }).unwrap()
      setFollow(false)
    } catch (error) {
      console.error('Ошибка отписки:', error)
    }
  }

  if (!profileData) {
    return null // Если profileData undefined, возвращаем null
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
        <Button variant={'secondary'}>Send Message</Button>
      </div>
    </div>
  )
}
