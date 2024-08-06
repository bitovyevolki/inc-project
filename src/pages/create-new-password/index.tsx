import CreateNewPassword from '@/src/features/auth/ui/createNewPassword/CreateNewPassword'
import { Header } from '@bitovyevolki/ui-kit-int'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function ForgotPassword() {
  return (
    <>
      <Link href={'/'}>back</Link>
      <CreateNewPassword />
    </>
  )
}
