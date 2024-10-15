import baseAvatar from '@/public/image/default-avatar.webp'
import { IGetLikeItem } from '@/src/features/post/model/posts.service.types'
import { Typography } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'

import s from './LikesCount.module.scss'

interface IProps {
  likesCount?: number
  userAvatars?: IGetLikeItem[]
}

export const LikesCount = ({ likesCount, userAvatars }: IProps) => {
  return (
    <div className={s.likesBox}>
      <div className={s.images}>
        {userAvatars
          ?.filter((i, ind) => ind < 3)
          .map(item => (
            <Image
              alt={'likeOwner'}
              height={36}
              key={item.id}
              src={item.avatars.length > 0 ? item.avatars[0].url : baseAvatar}
              width={36}
            />
          ))}
      </div>
      <Typography className={s.count} variant={'body2'}>
        {likesCount}
      </Typography>
      <Typography variant={'subTitle2'}>{`"Like"`}</Typography>
    </div>
  )
}
