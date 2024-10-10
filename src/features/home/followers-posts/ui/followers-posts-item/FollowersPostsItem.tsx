import baseAvatar from '@/public/image/default-avatar.webp'
import { useGetPostCommentsQuery } from '@/src/features/post/model/posts.service'
import { Typography } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'

import s from './FollowersPostsItem.module.scss'

import { IFollowersPostsItem } from '../../model/types'
import { IconsBox } from './icons-box/IconsBox'
import { PostCarusel } from './post-carusel/PostCarusel'
import { PostHeader } from './post-header/PostHeader'

interface IProps {
  item: IFollowersPostsItem
}

export const FollowersPostsItem = ({ item }: IProps) => {
  const { data: comments } = useGetPostCommentsQuery({ postId: item.id }, { skip: !item.id })

  return (
    <div className={s.post}>
      <PostHeader
        avatar={item.avatarOwner}
        name={item.userName}
        ownerId={item.ownerId}
        updatedAt={item.updatedAt}
      />
      <PostCarusel images={item.images} />
      <IconsBox ownerId={item.ownerId} postId={item.id} />
      <div className={s.descriptionBox}>
        <Image
          alt={'avatarOwner'}
          className={s.ownerAvatar}
          height={36}
          src={item.avatarOwner || baseAvatar}
          width={36}
        />
        <Typography variant={'body1'}>{item.userName}</Typography>
        <Typography className={s.description} variant={'body2'}>
          {item.description}
        </Typography>
      </div>
      <div className={s.likesBox}>
        <Typography variant={'body2'}>{item.likesCount}</Typography>
        <Typography variant={'body1'}>{'Like'}</Typography>
      </div>
      {comments && comments?.totalCount > 0 && (
        <Typography className={s.comments} variant={'subTitle2'}>
          View All Comments({comments?.totalCount})
        </Typography>
      )}
      <div>comment</div>
      <div>form border-bottom</div>
    </div>
  )
}
