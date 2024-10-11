import { useGetPostCommentsQuery } from '@/src/features/post/model/posts.service'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { Typography } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'

import s from './FollowersPostsItem.module.scss'

import { IFollowersPostsItem } from '../../model/types'
import { AddCommentForm } from './add-comment-form/AddCommentForm'
import { DescriptionBox } from './description-box/DescriptionBox'
import { IconsBox } from './icons-box/IconsBox'
import { LikesCount } from './likes-count/LikesCount'
import { PostCarusel } from './post-carusel/PostCarusel'
import { PostHeader } from './post-header/PostHeader'

interface IProps {
  item: IFollowersPostsItem
}

export const FollowersPostsItem = ({ item }: IProps) => {
  const { data: comments, refetch: refetchComments } = useGetPostCommentsQuery(
    { postId: item.id },
    { skip: !item.id }
  )

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
      <DescriptionBox
        avatarOwner={item.avatarOwner}
        description={item.description}
        ownerId={item.ownerId}
        userName={item.userName}
      />
      <LikesCount likesCount={item.likesCount} />
      {comments && comments?.totalCount > 0 && (
        <Typography className={s.comments} variant={'subTitle2'}>
          <Link
            className={s.link}
            href={`${RouterPaths.MY_PROFILE}/${item.ownerId}?postId=${item.id}`}
          >
            View All Comments({comments?.totalCount})
          </Link>
        </Typography>
      )}
      <AddCommentForm postId={item.id} refetchComments={refetchComments} />
      <div className={s.border} />
    </div>
  )
}
