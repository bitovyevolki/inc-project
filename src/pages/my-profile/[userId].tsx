import * as React from 'react'

import { ShowPosts } from '@/src/features/post/ui/showPosts/ShowPosts'
import { useRouter } from 'next/router'

export default function MyProfilePage() {
  const router = useRouter()
  const userId = router.query.userId as string

  return <ShowPosts profileId={userId} />
}
