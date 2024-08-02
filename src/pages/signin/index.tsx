import { Inter } from 'next/font/google'
import Link from 'next/link'
import { SignInForm } from '@/src/entities/signin-form/ui/SignInForm'

const inter = Inter({ subsets: ['latin'] })

export default function SignIn() {
  return (
    <div>
      <Link href="/">back</Link>
      <SignInForm />
    </div>
  )
}
