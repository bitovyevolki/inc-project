import { Inter } from 'next/font/google'
import Link from 'next/link'

import '@bitovyevolki/ui-kit-int/dist/style.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <nav className={'navigation'}>
        <Link href={'/forgot-password'}>Forgot password</Link>
        <Link href={'/create-new-password'}>Create new password</Link>
        <Link href={'/signin'}>Sign In</Link>
        <Link href={'/signup'}>Sign Up</Link>
        <Link href={'/personal-info'}>Profile</Link>
      </nav>
    </div>
  )
}
