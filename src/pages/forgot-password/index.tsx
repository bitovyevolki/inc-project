import { RestorePassword } from '@/src/features/auth/ForgotPassword/ui/RestorePassword'
import { Header } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'

export default function ForgotPassword() {
  return (
    <>
      <Link href={'/'}>back</Link>
      <RestorePassword />
    </>
  )
}
