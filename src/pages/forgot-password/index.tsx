import { ExpiredLink } from '@/src/features/auth/ForgotPassword/ui/expiredLink'
import { RestorePassword } from '@/src/features/auth/ForgotPassword/ui/restorePassword.tsx'
import { RestorePassword1 } from '@/src/features/auth/ForgotPassword/ui/restorePassword1.tsx'
import { Header } from '@bitovyevolki/ui-kit-int'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function ForgotPassword() {
  return (
    <>
      <Header isAuth onLanguageChange={() => {}} title={'Inctagram'} />
      <Link href={'/'}>back</Link>
      <RestorePassword1 />
    </>
  )
}
