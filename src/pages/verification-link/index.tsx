import ExpiredLink from '@/src/features/auth/ui/ForgotPassword/ExpiredLink.tsx'
import Link from 'next/link'

export default function SignIn() {
  return (
    <div>
      <Link href={'/'}>back</Link>
      <ExpiredLink />
    </div>
  )
}
