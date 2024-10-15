import { toast } from 'react-toastify'

import { useGetAllUsersQuery } from '@/src/features/post/model/follow.service'
import {
  useGetLikesByPostIdQuery,
  useGetPostCommentsQuery,
} from '@/src/features/post/model/posts.service'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { Typography } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

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
  const t = useTranslations('FollowersPosts')

  const locale = useLocale()

  const { data: comments, refetch: refetchComments } = useGetPostCommentsQuery(
    { postId: item.id },
    { skip: !item.id }
  )

  const { data: likes } = useGetLikesByPostIdQuery({ postId: item.id }, { skip: !item.id })

  const { data: profile } = useGetAllUsersQuery({
    userName: item.userName,
  })

  const copyUrlToClipboardHandler = () => {
    navigator.clipboard.writeText(
      `${window.location.toString()}${RouterPaths.MY_PROFILE.slice(1)}/${item.ownerId}?postId=${
        item.id
      }`
    )

    toast.success(t('link-copied'), { position: 'top-right' })
  }

  return (
    <div className={s.post}>
      <PostHeader
        avatar={item.avatarOwner}
        copyUrl={copyUrlToClipboardHandler}
        isFollowing={profile?.isFollowing}
        name={item.userName}
        ownerId={item.ownerId}
        updatedAt={item.updatedAt}
      />
      <PostCarusel images={item.images} />
      <IconsBox
        copyUrl={copyUrlToClipboardHandler}
        isLiked={likes?.isLiked}
        ownerId={item.ownerId}
        postId={item.id}
      />
      <DescriptionBox
        avatarOwner={item.avatarOwner}
        description={item.description}
        ownerId={item.ownerId}
        userName={item.userName}
      />
      <LikesCount likesCount={likes?.totalCount} userAvatars={likes?.items} />
      {comments && comments?.totalCount > 0 && (
        <Typography className={s.comments} variant={'subTitle2'}>
          <Link
            className={s.link}
            href={`${RouterPaths.MY_PROFILE}/${item.ownerId}?postId=${item.id}`}
          >
            {t('view-all-comments')}({comments?.totalCount})
          </Link>
        </Typography>
      )}
      <AddCommentForm postId={item.id} refetchComments={refetchComments} />
      <div className={s.border} />
    </div>
  )
}
