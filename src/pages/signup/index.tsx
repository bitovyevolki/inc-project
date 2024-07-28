import { SignUpForm } from '@/src/features/auth/sing-up/ui/sing-up/SingUp.form'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import s from './sing-up.module.scss'
const inter = Inter({ subsets: ['latin'] })

export default function SignUp() {
  const handleSubmit = (data: FormData) => {
    const formValues = Object.fromEntries(data)

    console.log(formValues)
  }

  return (
    <div className={s.page}>
      <SignUpForm onSubmit={handleSubmit} />
      <Link href={'/'}>back</Link>
    </div>
  )
}
