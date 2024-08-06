import { RestorePassword } from '@/src/features/auth/ui/ForgotPassword/RestorePassword.tsx'
import Link from 'next/link'

export default function ForgotPassword() {
  return (
    <div>
      <Link href={'/'}>back</Link>
      <RestorePassword />
    </div>
  )
}
