import { SignUpForm } from '@/src/features/auth/signUp'

import s from './sign-up.module.scss'

export default function SignUp() {
  return (
    <div className={s.page}>
      <SignUpForm />
    </div>
  )
}
