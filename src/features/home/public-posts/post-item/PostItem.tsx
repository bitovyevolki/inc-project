import React, { useState } from 'react'
import ShowMoreText from 'react-show-more-text'

import { Post } from '@/src/features/post/model/posts.service.types'
import { Typography } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'

import s from './PostItem.module.scss'

type PostItemProps = {
  post: Post
}

export const PostItem = ({ post }: PostItemProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const handleOnCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className={s.root}>
      <Image alt={'post image'} height={240} src={post.images[0].url} width={234} />
      <div className={s.header}>
        <Image alt={'avatar owner'} height={36} src={post.avatarOwner} width={36} />
        <Typography variant={'h3'}>{post.userName}</Typography>
      </div>
      <Typography className={s.status} variant={'caption'}>
        {post.createdAt}
      </Typography>
      <ShowMoreText
        anchorClass={s.showMore}
        expanded={isCollapsed}
        less={'Hide'}
        lines={1}
        more={'Show more'}
        onClick={handleOnCollapse}
        width={234}
      >
        {post.description}
      </ShowMoreText>
    </div>
  )
}
