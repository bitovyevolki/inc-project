import ExpiredLink from '@/src/features/auth/expiredLink/ui/ExpiredLink'
import Link from 'next/link'

export default function ExpiredLinkPage() {
  const email = 'test@test.com'
  return (
    <div>
      <Link href={'/'}>back</Link>
      <ExpiredLink email={email} />
    </div>
  )
}
