import { useCallback, useEffect, useState } from 'react'

import { useGetFollowersPostsQuery } from '../api/followers-posts.service'

const SCROLL_OFFSET = 5

export const useFollowersPosts = () => {
  const [lastPostId, setLastPostId] = useState(0)
  const { data, error, isLoading } = useGetFollowersPostsQuery({ endCursorPostId: lastPostId })

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - SCROLL_OFFSET
    ) {
      const items = data?.items

      if (items?.length === data?.totalCount) {
        return
      }

      let lastCombinedPostId

      if (items && items.length > 0) {
        lastCombinedPostId = items[items.length - 1].id
      }

      setLastPostId(lastCombinedPostId ?? 0)
    }
  }, [data?.items, data?.totalCount])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return { data, error, isLoading }
}
