import { useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { usePostsParams } from '@/src/features/post/lib/hooks/usePostsParams'
import { useGetAllUsersQuery } from '@/src/features/post/model/follow.service'
import {
  useGetLikesByPostIdQuery,
  useGetPostCommentsQuery,
} from '@/src/features/post/model/posts.service'
import { ViewPost } from '@/src/features/post/ui'
import { ViewPostModal } from '@/src/features/post/ui/viewPostModal'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { Typography } from '@bitovyevolki/ui-kit-int'
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

  const { removeQueryParamHandler } = usePostsParams()

  const [viewMode, setViewMode] = useState(false)
  const bodyRef = useRef(document.body)
  const handleOnPostClick = () => {
    setViewMode(true)
    bodyRef.current.style.overflow = 'hidden'
  }
  const handlePostClose = () => {
    setViewMode(false)
    bodyRef.current.style.overflow = ''
    removeQueryParamHandler('postId')
  }

  const { data: comments, refetch: refetchComments } = useGetPostCommentsQuery(
    { postId: item.id },
    { skip: !item.id }
  )

  const { data: likes } = useGetLikesByPostIdQuery({ postId: item.id }, { skip: !item.id })

  const { data: profile } = useGetAllUsersQuery({
    userName: item.userName,
  })
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin
  const postUrl = `${baseUrl}/profile/${item.ownerId}?postId=${item.id}`

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
        isLiked={likes?.isLiked}
        ownerId={item.ownerId}
        postId={item.id}
        postUrl={postUrl}
      />
      <DescriptionBox
        avatarOwner={item.avatarOwner}
        description={item.description}
        ownerId={item.ownerId}
        userName={item.userName}
      />
      <LikesCount likesCount={likes?.totalCount} userAvatars={likes?.items} />
      {comments && comments?.totalCount > 0 && (
        <Typography className={s.comments} onClick={handleOnPostClick} variant={'subTitle2'}>
          {t('view-all-comments')}({comments?.totalCount})
        </Typography>
      )}
      <AddCommentForm postId={item.id} refetchComments={refetchComments} />
      <div className={s.border} />
      {viewMode && (
        <ViewPostModal isOpen={viewMode} onOpenChange={handlePostClose}>
          <ViewPost
            avatars={item.avatarOwner}
            closePostModal={handlePostClose}
            post={item}
            userName={item.userName}
          />
        </ViewPostModal>
      )}
    </div>
  )
}
