import * as React from 'react'
import { useEffect, useState } from 'react'

import { useGetProfileByIdQuery } from '@/src/entities/profile/api/profile.service'
import { GetProfileByIdArgs } from '@/src/entities/profile/model/types/profile'
import { useMeQuery } from '@/src/features/auth/service/auth.service'
import {
  useGetPublicPostsByUserIdQuery,
  useLazyGetPublicPostsByUserIdQuery,
} from '@/src/features/post/model/posts.service'
import { Post } from '@/src/features/post/model/posts.service.types'
import { ViewPost } from '@/src/features/post/ui'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Button, ModalWindow, Typography } from '@bitovyevolki/ui-kit-int'
import clsx from 'clsx'
import Link from 'next/link'

import s from './showPosts.module.scss'

const SCROLL_OFFSET = 5
const POSTS_INCREMENT = 8

type Props = {
  profileId?: string
}
export const ShowPosts = ({ profileId }: Props) => {
  const { data: meData, isLoading: isLoadingMe } = useMeQuery()
  const { data: profileData, isLoading: LoadingProfile } = useGetProfileByIdQuery({
    profileId,
  } as GetProfileByIdArgs)

  const isLoading = isLoadingMe || LoadingProfile

  //TODO how to get rid of casting below?
  const userName = profileData?.userName as string
  const userId = profileData?.id as number

  const { data: publicPostsData } = useGetPublicPostsByUserIdQuery({ userId })
  const [showNextPosts, { data: nextPostsData }] = useLazyGetPublicPostsByUserIdQuery()
  const [currentPageSize, setCurrentPageSize] = useState<number>(POSTS_INCREMENT)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [postForView, setPostForView] = useState<Post>()

  const showPosts = publicPostsData?.items
  const [posts, setPosts] = useState(showPosts)

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - SCROLL_OFFSET
    ) {
      setCurrentPageSize(currentPageSize => currentPageSize + POSTS_INCREMENT)
    }
  }

  useEffect(() => {
    showNextPosts({ pageSize: currentPageSize, userId })
      .unwrap()
      .then(data => {
        setPosts(data.items)
      })
  }, [currentPageSize, userId])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const showSettingsButton = meData?.userId === profileData?.id

  const onOpenPost = (post: Post) => {
    setIsModalOpen(true)
    setPostForView(post)
    console.log('current post: ', post)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.userPresentation}>
          <div className={clsx(s.userAvatar)}>
            <img alt={'avatar'} src={profileData?.avatars[0].url} />
          </div>
          <div className={s.textPresentation}>
            <Typography as={'p'} className={s.userName} variant={'h3'}>
              {profileData?.userName}
            </Typography>
            <Typography as={'p'} variant={'body1'}>
              {profileData?.aboutMe}
            </Typography>
            {showSettingsButton && (
              // @ts-ignore
              <Button
                as={Link}
                className={s.settingsButton}
                href={`/personal-info`}
                variant={'primary'}
              >
                Profile Settings
              </Button>
            )}
          </div>
        </div>
        <div className={s.postsGallery}>
          {posts?.map(post => (
            <div key={post.id}>
              <div onClick={() => onOpenPost(post)}>
                <img alt={'post image'} src={post?.images?.[0]?.url} width={300} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <ModalWindow
          className={s.modal}
          onOpenChange={() => setIsModalOpen(false)}
          open={isModalOpen}
          title={'View Post'}
        >
          <ViewPost
            avatars={profileData?.avatars}
            imageUrl={postForView?.images[0]?.url}
            post={postForView}
            userName={userName}
          />
        </ModalWindow>
      )}
    </>
  )
}
