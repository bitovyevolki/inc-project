import { HomePage } from '@/src/features/home/HomePage'
import { GetLastCreatedPostsResponse } from '@/src/features/post/model/posts.service.types'
import { NextPageWithLayout } from '@/src/pages/_app'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const params = {
    pageSize: '4',
    sortBy: 'createdAt',
    sortDirection: 'desc',
  }
  const queryParams = new URLSearchParams(params).toString()

  const messages = (await import(`../locales/${locale || 'en'}.json`)).default

  try {
    const response = await fetch(`https://inctagram.work/api/v1/public-posts/all/?${queryParams}`)
    const posts: GetLastCreatedPostsResponse = await response.json()

    return {
      props: {
        data: posts,
        messages,
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

const Home: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({
  data,
  ...props
}) => {
  return <HomePage posts={data} {...props} />
}

export default Home
