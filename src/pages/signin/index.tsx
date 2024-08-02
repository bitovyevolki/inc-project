import Link from 'next/link'
import { SignInForm } from '@/src/entities/signin-form/ui/SignInForm'

export default function SignIn() {
  return (
    <>
      <Link href="/">back</Link>
      <SignInForm />
    </>
  )
}
