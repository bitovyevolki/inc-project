import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function SignIn() {
  return (
    <>
      <h2>sigin</h2>
      <Link href="/">back</Link>
    </>
  )
}
