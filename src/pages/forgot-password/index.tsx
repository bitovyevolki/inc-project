import { RestorePassword } from '@/src/features/auth/ForgotPassword/ui/RestorePassword'
import { Header } from '@bitovyevolki/ui-kit-int'
import { Inter } from 'next/font/google'
import Link from 'next/link'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

const inter = Inter({ subsets: ['latin'] })

export default function ForgotPassword() {
  return (
    <>
      <Header isAuth onLanguageChange={() => {}} title={'Inctagram'} />
      <Link href={'/'}>back</Link>
      <RestorePassword />
    </>
  )
}
