import { Button } from '@/node_modules/@bitovyevolki/ui-kit-int/dist/index'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function ForgotPassword() {
  return (
    <>
      <h2>forgotpassword</h2>
      <Link href={'/'}>back</Link>
    </>
  )
}
