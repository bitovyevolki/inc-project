import { useEffect, useState } from 'react'

import { useGetProfileByIdQuery } from '@/src/entities/profile/userProfile/api/profile.service'
import { GetProfileByIdArgs } from '@/src/entities/profile/userProfile/model/types/profile'
import { useMeQuery } from '@/src/features/auth/service/auth.service'
import { CreatePost, ViewPost } from '@/src/features/post/ui'
import { ViewPostModal } from '@/src/features/post/ui/viewPostModal/ViewPostModal'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { motion } from 'framer-motion'
import Image from 'next/image'

import s from './Profile.module.scss'

import { usePosts } from '../../lib/hooks/usePosts'
import { usePostsParams } from '../../lib/hooks/usePostsParams'
import { Post } from '../../model/posts.service.types'
import { ProfileInfo } from '../profileInfo/ProfileInfo'

type Props = {
  post: Post | null
  profileId?: string
}

export const Profile = ({ post, profileId }: Props) => {
  const [isViewPostModalOpen, setIsViewPostModalOpen] = useState<boolean>(false)
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false)

  const {
    addPostToCombinedPosts,
    combinedPosts,
    deletePostFromCombinedPostsArray,
    isLoadingPosts,
  } = usePosts({
    profileId,
  })
  const { changeQueryHandler, removeQueryParamHandler, searchParams } = usePostsParams()

  const { data: meData, isLoading: isLoadingMe } = useMeQuery()
  const {
    data: profileData,
    isLoading: LoadingProfile,
    refetch,
  } = useGetProfileByIdQuery({
    profileId,
  } as GetProfileByIdArgs)

  const isLoading = isLoadingMe || LoadingProfile || isLoadingPosts

  useEffect(() => {
    refetch()
  }, [refetch])

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

  const closeViewPostModalHandler = () => {
    removeQueryParamHandler('postId')
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
        {profileData && meData && (
          <ProfileInfo meId={meData?.userId} userName={profileData.userName} />
        )}

        {meData && (
          <div className={s.postsGallery}>
            {combinedPosts.length > 0 &&
              combinedPosts.map(post => (
                <motion.div
                  animate={{ opacity: [0, 1] }}
                  className={s.galleryItem}
                  key={post.id}
                  onClick={() => changeQueryHandler(post.id as number)}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    alt={'post image'}
                    fill
                    priority
                    sizes={'(max-width: 768px) 100vw, 400px'}
                    src={post?.images?.[0]?.url}
                  />
                </motion.div>
              ))}
          </div>
        )}
      </div>
      {post && (
        <ViewPostModal isOpen={isViewPostModalOpen} onOpenChange={closeViewPostModalHandler}>
          <ViewPost
            avatars={profileData?.avatars}
            closePostModal={closeViewPostModalHandler}
            deletePostFromCombinedPostsArray={deletePostFromCombinedPostsArray}
            post={post}
            userName={profileData?.userName as string}
          />
        </ViewPostModal>
      )}

      <CreatePost
        addPost={addPostToCombinedPosts}
        closeModal={closeCreatePostModalHandler}
        isOpenModal={isCreatePostModalOpen}
      />
    </>
  )
}
