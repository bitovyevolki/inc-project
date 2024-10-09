import { useState } from 'react'
import ShowMoreText from 'react-show-more-text'

import { usePostsParams } from '@/src/features/post/lib/hooks/usePostsParams'
import { Post } from '@/src/features/post/model/posts.service.types'
import { ViewPost } from '@/src/features/post/ui'
import { ViewPostModal } from '@/src/features/post/ui/viewPostModal'
import { PhotoSlider } from '@/src/shared/ui/PhotoSlider/PhotoSlider'
import { Typography } from '@bitovyevolki/ui-kit-int'
import moment from 'moment'
import Image from 'next/image'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import s from './PublicPostItem.module.scss'

import postImage from '../../../../../public/image/default-post.png'

type PublicPostItemProps = {
  post: Post
}

export const PublicPostItem = ({ post }: PublicPostItemProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const handleOnCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }
  const { removeQueryParamHandler } = usePostsParams()

  const [viewMode, setViewMode] = useState(false)

  const handleOnPostClick = () => {
    setViewMode(true)
  }
  const handlePostClose = () => {
    setViewMode(false)
    removeQueryParamHandler('postId')
  }

  return (
    <div className={s.root}>
      {post.images.length > 1 ? (
        <PhotoSlider>
          {post.images.map((image, index) => (
            <div key={image.uploadId} onClick={handleOnPostClick}>
              <Image alt={`post.image ${index}`} height={240} src={image.url} width={234} />
            </div>
          ))}
        </PhotoSlider>
      ) : (
        <Image
          alt={'no photo'}
          height={240}
          onClick={handleOnPostClick}
          src={post?.images[0]?.url || postImage}
          width={234}
        />
      )}
      <div className={s.ownerInfo}>
        <Image
          alt={'avatar owner'}
          className={s.avatar}
          height={36}
          src={post.avatarOwner || postImage}
          width={36}
        />
        <Typography variant={'h4'}>{post.userName}</Typography>
      </div>
      <Typography className={s.time} variant={'caption'}>
        {moment(post.createdAt).fromNow()}
      </Typography>
      <div className={s.postDescription}>
        <ShowMoreText
          anchorClass={s.showMore}
          expanded={isCollapsed}
          less={'Hide'}
          lines={3}
          more={'Show more'}
          onClick={handleOnCollapse}
          width={234}
        >
          {post.description}
        </ShowMoreText>
      </div>
      {viewMode && (
        <ViewPostModal isOpen={viewMode} onOpenChange={handlePostClose}>
          <ViewPost closePostModal={handlePostClose} post={post} userName={post.userName} />
        </ViewPostModal>
      )}
    </div>
  )
}
