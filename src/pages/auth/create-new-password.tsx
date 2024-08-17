import { CreateNewPassword } from '@/src/features/auth/createNewPassword'

export default function ForgotPasswordPage() {
  const recoveryCode = 'zagluska'

  return <CreateNewPassword recoveryCode={recoveryCode} />
}
