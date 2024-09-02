import React, { ReactNode, useState } from 'react'
import ShowMoreText from 'react-show-more-text'

import { Post } from '@/src/features/post/model/posts.service.types'
import { PhotoSlider } from '@/src/shared/ui/PhotoSlider/PhotoSlider'
import { Typography } from '@bitovyevolki/ui-kit-int'
import moment from 'moment'
import Image from 'next/image'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import s from './PublicPostItem.module.scss'
type PublicPostItemProps = {
  post: Post
}

export const PublicPostItem = ({ post }: PublicPostItemProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const handleOnCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className={s.root}>
      {post.images.length > 1 ? (
        <PhotoSlider>
          {post.images.map((image, index) => (
            <div key={image.uploadId}>
              <Image alt={`post.image ${index}`} height={240} src={image.url} width={234} />
            </div>
          ))}
        </PhotoSlider>
      ) : (
        <Image alt={'post image'} height={240} src={post.images[0].url} width={234} />
      )}
      <div className={s.ownerInfo}>
        <Image
          alt={'avatar owner'}
          className={s.avatar}
          height={36}
          src={post.avatarOwner}
          width={36}
        />
        <Typography variant={'h4'}>{post.userName}</Typography>
      </div>
      <Typography className={s.time} variant={'caption'}>
        {moment(post.createdAt).fromNow()}
      </Typography>
      <Typography className={s.postDescription} variant={'body2'}>
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
      </Typography>
    </div>
  )
}
