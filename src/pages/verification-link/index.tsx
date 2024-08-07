import ExpiredLink from '@/src/features/auth/expiredLink/ui/ExpiredLink'
import Link from 'next/link'

export default function SignIn() {
  return (
    <div>
      <Link href={'/'}>back</Link>
      <ExpiredLink />
    </div>
  )
}