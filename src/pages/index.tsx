import { Inter } from 'next/font/google'
import '@bitovyevolki/ui-kit-int/css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div>
        <nav className="navigation">
          <Link href="/forgot-password">Forgot password</Link>
          <Link href="/signin">Sign In</Link>
          <Link href="/signup">Sign Up</Link>
          <Link href="/create-password">Create Password</Link>
          <Link href="/personal-info">Profile</Link>
        </nav>
      </div>
    </>
  )
}
