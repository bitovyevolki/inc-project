import { RestorePassword } from '@/src/pages/forgot-password/restorePassword/restorePassword'
import { Header } from '@bitovyevolki/ui-kit-int'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function ForgotPassword() {
  return (
    <>
      <Header isAuth={false} onLanguageChange={() => {}} title={'Inctagram'} />
      <Link href={'/'}>back</Link>
      <RestorePassword />
    </>
  )
}
