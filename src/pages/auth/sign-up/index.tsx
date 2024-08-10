import { SignUpForm } from '@/src/features/auth/signUp'

import s from './sign-up.module.scss'

export default function SignUp() {
  const handleSubmit = (data: FormData) => {
    const formValues = Object.fromEntries(data)

    // console.log(formValues)
  }

  return (
    <div className={s.page}>
      <SignUpForm onSubmit={handleSubmit} />
    </div>
  )
}
