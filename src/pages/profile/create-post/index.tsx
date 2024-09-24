import { CreatePost } from '@/src/features/post/ui/createPost/CreatePost'
import { GetServerSideProps } from 'next'

export default function CreatePostPage(props: any) {
  return <CreatePost {...props} />
}

export const getServerSideProps: GetServerSideProps = async context => {
  const locale = context.req.cookies['next-language'] || 'en'
  const messages = (await import(`../../../locales/${locale}.json`)).default

  return {
    props: {
      messages,
    },
  }
}
