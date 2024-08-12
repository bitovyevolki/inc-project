import { ExpiredLink } from '@/src/features/auth/expiredLink'

export default function ExpiredLinkPage() {
  const email = 'test@test.com'

  return <ExpiredLink email={email} />
}
