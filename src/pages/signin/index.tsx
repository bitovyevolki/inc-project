import { SignInForm } from '@/src/features/auth/ui/signin-form/SignInForm.tsx'
import Link from 'next/link'

export default function SignIn() {
  return (
    <div>
      <Link href={'/'}>back</Link>
      <SignInForm />
    </div>
  )
}
