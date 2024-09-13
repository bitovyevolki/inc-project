import { useEffect, useState } from 'react'

import { useGetPublicPostsByUserIdQuery } from '../../model/posts.service'
import { Post } from '../../model/posts.service.types'

const SCROLL_OFFSET = 5
const STANDARD_PORTION_SIZE = 8

export const usePosts = ({ profileId }: { profileId: string | undefined }) => {
  const [lastPostId, setLastPostId] = useState(0)
  const [portionSize, setPortionSize] = useState(STANDARD_PORTION_SIZE)
  const [combinedPosts, setCombinedPosts] = useState<Post[]>([])

  const { data: publicPostsData } = useGetPublicPostsByUserIdQuery(
    {
      endCursorPostId: lastPostId,
      pageSize: portionSize,
      userId: Number(profileId),
    },
    { skip: !profileId }
  )

  const deletePostFromCombinedPostsArray = (postId: number) => {
    setCombinedPosts(prev => prev.filter(p => p.id !== postId))
  }

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - SCROLL_OFFSET
    ) {
      if (combinedPosts.length === publicPostsData?.totalCount) {
        return
      }

      let lastCombinedPostId

      if (combinedPosts.length > 0) {
        lastCombinedPostId = combinedPosts[combinedPosts.length - 1].id
      }

      const remainsItems = combinedPosts.length % STANDARD_PORTION_SIZE

      const finalPortionSize =
        remainsItems > 0
          ? STANDARD_PORTION_SIZE - remainsItems + STANDARD_PORTION_SIZE
          : STANDARD_PORTION_SIZE

      setPortionSize(finalPortionSize)
      setLastPostId(lastCombinedPostId ?? 0)
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

  return { combinedPosts, deletePostFromCombinedPostsArray }
}
