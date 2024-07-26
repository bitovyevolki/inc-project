import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function PersonalInfo() {
  return (
    <>
      <h2>PersonalInfo</h2>
      <Link href={'/'}>back</Link>
    </>
  )
}
