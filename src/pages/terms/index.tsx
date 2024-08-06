import { TermsOfService } from '../../features/auth/ui/legal/terms-of-service'
import Link from 'next/link'

export default function SignIn() {
  return (
    <div>
      <Link href={'/'}>back</Link>
      <TermsOfService
        text={
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, consequatur ipsum voluptatibus cumque nam qui alias deserunt earum veniam praesentium? Natus enim officia et aspernatur unde beatae facilis assumenda sunt'
        }
      />
    </div>
  )
}
