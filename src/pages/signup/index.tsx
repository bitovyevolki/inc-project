import { SignUpForm } from '@/src/features/auth/sing-up/ui/sing-up/SingUp.form'
import Link from 'next/link'

import s from './sing-up.module.scss'

export default function SignUp() {
  const handleSubmit = (data: FormData) => {
    const formValues = Object.fromEntries(data)

    console.log(formValues)
  }

  return (
    <div className={s.page}>
      <Link href={'/'}>back</Link>
      <SignUpForm onSubmit={handleSubmit} />
    </div>
  )
}
