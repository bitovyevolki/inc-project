import { TermsOfService } from '@/src/features/auth/terms-of-service'
import Link from 'next/link'

export default function SignIn() {
  return (
    <div>
      <Link href={'/'}>back</Link>
      <TermsOfService text={'text'} />
    </div>
  )
}
