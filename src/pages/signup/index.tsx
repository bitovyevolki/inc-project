import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function SignUp() {
  return (
    <div>
      <h2>sign up</h2>
      <Link href="/">back</Link>
    </div>
  )
}
