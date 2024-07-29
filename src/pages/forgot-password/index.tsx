import { RestorePassword2 } from '@/src/features/auth/ForgotPassword/ui/restorePassword2'
import { Header } from '@bitovyevolki/ui-kit-int'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function ForgotPassword() {
  return (
    <>
      <Header isAuth onLanguageChange={() => {}} title={'Inctagram'} />
      <Link href={'/'}>back</Link>
      <RestorePassword2 />
    </>
  )
}
