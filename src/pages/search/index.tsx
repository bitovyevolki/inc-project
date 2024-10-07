import { SearchProfile } from '@/src/entities/profile/search'
import { GetServerSideProps } from 'next'

export default function SerachPage() {
  return (
    <div>
      <SearchProfile />
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
