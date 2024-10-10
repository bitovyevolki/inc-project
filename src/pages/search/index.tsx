import { SearchUsers } from '@/src/entities/profile/searchUsers'
import { GetServerSideProps } from 'next'

export default function SerachPage() {
  return (
    <div>
      <SearchUsers />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const locale = context.req.cookies['next-language'] || 'en'
  const messages = (await import(`../../locales/${locale}.json`)).default

  return {
    props: {
      messages,
    },
  }
}
