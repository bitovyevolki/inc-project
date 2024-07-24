import { Button } from '@/node_modules/@bitovyevolki/ui-kit-int/dist/index'
import Link from 'next/link'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function ForgotPassword() {
  return (
    <>
      <h2>forgotpassword</h2>
      <Link href="/">back</Link>
    </>
  )
}
