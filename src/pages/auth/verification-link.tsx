import { ExpiredLink } from '@/src/features/auth/expiredLink'

export default function VerificationLinkPage() {
  const email = 'test@test.com'

  return <ExpiredLink email={email} />
}
