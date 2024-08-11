import { SignUpForm } from '@/src/features/auth/sing-up/ui/sing-up'

import s from './sing-up.module.scss'

export default function SignUp() {
  return (
    <div className={s.page}>
      <SignUpForm />
    </div>
  )
}
