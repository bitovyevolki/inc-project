import ExpiredLink from '@/src/features/auth/ForgotPassword/ui/ExpiredLink'
import Link from 'next/link'

export default function SignIn() {
  return (
    <div>
      <Link href={'/'}>back</Link>
      <ExpiredLink />
    </div>
  )
}
