import { SignInForm } from '@/src/entities/signin-form/ui/SignInForm'
import Link from 'next/link'

export default function SignIn() {
  return (
    <div>
      <Link href={'/'}>back</Link>
      <SignInForm />
    </div>
  )
}
