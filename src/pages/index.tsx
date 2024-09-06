import { HomePage } from '@/src/features/home/HomePage'
import { GetLastCreatedPostsResponse } from '@/src/features/post/model/posts.service.types'
import { NextPageWithLayout } from '@/src/pages/_app'
import { InferGetStaticPropsType } from 'next'

export const getStaticProps = async () => {
  const params = {
    pageSize: '4',
    sortBy: 'createdAt',
    sortDirection: 'desc',
  }
  const queryParams = new URLSearchParams(params).toString()

  try {
    const response = await fetch(`https://inctagram.work/api/v1/public-posts/all/?${queryParams}`)
    const posts: GetLastCreatedPostsResponse = await response.json()

    return {
      props: { data: posts },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
const Home: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  return <HomePage posts={data} />
}

export default Home
