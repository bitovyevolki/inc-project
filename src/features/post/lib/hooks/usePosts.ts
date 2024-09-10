import { useEffect, useState } from 'react'

import { useGetPublicPostsByUserIdQuery } from '../../model/posts.service'
import { Post } from '../../model/posts.service.types'

const SCROLL_OFFSET = 5
const POSTS_INCREMENT = 8

export const usePosts = ({ profileId }: { profileId: string | undefined }) => {
  const [lastPostId, setLastPostId] = useState(0)
  const [combinedPosts, setCombinedPosts] = useState<Post[]>([])

  const { data: publicPostsData } = useGetPublicPostsByUserIdQuery(
    {
      endCursorPostId: lastPostId,
      pageSize: POSTS_INCREMENT,
      userId: Number(profileId),
    },
    { skip: !profileId }
  )

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - SCROLL_OFFSET
    ) {
      const lastCombinedPostId = combinedPosts[combinedPosts.length - 1].id

      if (combinedPosts.length === publicPostsData?.totalCount) {
        return
      }

      if (lastCombinedPostId) {
        setLastPostId(lastCombinedPostId)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [combinedPosts])

  useEffect(() => {
    if (publicPostsData?.items) {
      setCombinedPosts(prev => [...prev, ...publicPostsData.items])
    }
  }, [publicPostsData?.items])

  return { combinedPosts }
}
