import * as React from 'react'
import { useEffect, useState } from 'react'

import { useGetProfileByIdQuery } from '@/src/entities/profile/api/profile.service'
import { GetProfileByIdArgs } from '@/src/entities/profile/model/types/profile'
import { useMeQuery } from '@/src/features/auth/service/auth.service'
import {
  useGetPublicPostsByUserIdQuery,
  useLazyGetPublicPostsByUserIdQuery,
} from '@/src/features/post/model/posts.service'
import { ViewPost } from '@/src/features/post/ui'
import { ViewPostModal } from '@/src/features/post/ui/viewPostModal/ViewPostModal'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Button, ModalWindow, Typography } from '@bitovyevolki/ui-kit-int'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import s from './showPosts.module.scss'

import { Post } from '../../model/posts.service.types'
import baseUserPhoto from './../../../../../public/image/default-post.png'

const SCROLL_OFFSET = 5
const POSTS_INCREMENT = 8

type Props = {
  post: Post | null
  profileId?: string
}
export const ShowPosts = ({ post, profileId }: Props) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

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
    if (post) {
      onOpenPost()
    }
  }, [post])

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

  const createQueryStringHandler = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set(name, value)

    return params.toString()
  }

  const removeQueryParamHandler = (param: string) => {
    const params = new URLSearchParams(searchParams)

    params.delete(param)
    router.replace({ pathname, query: params.toString() }, undefined, { shallow: true })
  }

  const onOpenPost = () => {
    setIsModalOpen(true)
  }

  const onClosePost = () => {
    setIsModalOpen(false)
  }

  const setIsModalOpenHandler = (value: boolean) => {
    setIsModalOpen(value)
  }

  const changeQueryHandler = (id: number) => {
    router.push(pathname + '?' + createQueryStringHandler('postId', String(id)))
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.userPresentation}>
          <div className={clsx(s.userAvatar)}>
            <Image
              alt={'avatar'}
              fill
              src={(profileData?.avatars[0]?.url as string) || baseUserPhoto}
            />
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
          {showPosts?.map(post => (
            <div
              className={s.galleryItem}
              key={post.id}
              onClick={() => changeQueryHandler(post.id as number)}
            >
              <Image alt={'post image'} fill src={post?.images?.[0]?.url} />
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <ViewPostModal isOpen={isModalOpen} onOpenChange={setIsModalOpenHandler}>
          <ViewPost
            avatars={profileData?.avatars}
            closePostModal={onClosePost}
            post={post as Post}
            removeQuery={removeQueryParamHandler}
            userName={userName}
          />
        </ViewPostModal>
      )}
    </>
  )
}
