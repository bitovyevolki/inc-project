import { SingUpForm } from '@/src/features/auth/sing-up/ui/SingUp.form'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import s from './sing-up.module.scss'
const inter = Inter({ subsets: ['latin'] })

export default function SignUp() {
  return (
    <div className={s.page}>
      <SingUpForm />
      <Link href={'/'}>back</Link>
    </div>
  )
}
