import * as React from 'react'
import { useEffect, useState } from 'react'

import { useGetProfileByIdQuery } from '@/src/entities/profile/api/profile.service'
import { GetProfileByIdArgs } from '@/src/entities/profile/model/types/profile'
import { useMeQuery } from '@/src/features/auth/service/auth.service'
import { CreatePost, ViewPost } from '@/src/features/post/ui'
import { ViewPostModal } from '@/src/features/post/ui/viewPostModal/ViewPostModal'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Button, Typography } from '@bitovyevolki/ui-kit-int'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import s from './showPosts.module.scss'

import { usePosts } from '../../lib/hooks/usePosts'
import { usePostsParams } from '../../lib/hooks/usePostsParams'
import { Post } from '../../model/posts.service.types'
import baseUserPhoto from './../../../../../public/image/default-post.png'

type Props = {
  post: Post | null
  profileId?: string
}
export const ShowPosts = ({ post, profileId }: Props) => {
  const [isViewPostModalOpen, setIsViewPostModalOpen] = useState<boolean>(false)
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false)

  const { addPostToCombinedPosts, combinedPosts, deletePostFromCombinedPostsArray } = usePosts({
    profileId,
  })
  const { changeQueryHandler, removeQueryParamHandler, searchParams } = usePostsParams()

  const { data: meData, isLoading: isLoadingMe } = useMeQuery()
  const { data: profileData, isLoading: LoadingProfile } = useGetProfileByIdQuery({
    profileId,
  } as GetProfileByIdArgs)

  const isLoading = isLoadingMe || LoadingProfile

  useEffect(() => {
    if (searchParams.get('createPost')) {
      setIsCreatePostModalOpen(true)
    }
  }, [searchParams])

  useEffect(() => {
    if (post) {
      setIsViewPostModalOpen(true)
    }
  }, [post])

  const showSettingsButton = meData?.userId === profileData?.id

  const closeViewPostModalHandler = () => {
    setIsViewPostModalOpen(false)
  }

  const closeCreatePostModalHandler = () => {
    removeQueryParamHandler('createPost')
    setIsCreatePostModalOpen(false)
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
          {combinedPosts.map(post => (
            <motion.div
              animate={{ opacity: [0, 1] }}
              className={s.galleryItem}
              key={post.id}
              onClick={() => changeQueryHandler(post.id as number)}
              transition={{ duration: 0.5 }}
            >
              <Image alt={'post image'} fill src={post?.images?.[0]?.url} />
            </motion.div>
          ))}
        </div>
      </div>
      <ViewPostModal isOpen={isViewPostModalOpen} onOpenChange={closeViewPostModalHandler}>
        <ViewPost
          avatars={profileData?.avatars}
          closePostModal={closeViewPostModalHandler}
          deletePostFromCombinedPostsArray={deletePostFromCombinedPostsArray}
          post={post as Post}
          removeQuery={removeQueryParamHandler}
          userName={profileData?.userName as string}
        />
      </ViewPostModal>
      <CreatePost
        addPost={addPostToCombinedPosts}
        closeModal={closeCreatePostModalHandler}
        isOpenModal={isCreatePostModalOpen}
      />
    </>
  )
}
