import RestorePassword from '@/src/features/auth/ForgotPassword/ui/RestorePassword'
import Link from 'next/link'

export default function ForgotPassword() {
  return (
    <div>
      <Link href={'/'}>back</Link>
      <RestorePassword />
    </div>
  )
}
