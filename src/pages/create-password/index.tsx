import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function CreatePassword() {
  return (
    <>
      <h2>CreatePassword</h2>
      <Link href="/">back</Link>
    </>
  )
}
