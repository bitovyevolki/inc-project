import { TermsOfService } from '@/src/features/auth/terms-of-service'
import Link from 'next/link'

export default function SignIn() {
  const style = {
    display: 'flex',
    justifyContent: 'center',
    margin: '30px',
  }

  return (
    <div style={style}>
      <Link href={'/'}>back</Link>
      <TermsOfService
        text={
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, consequatur ipsum voluptatibus cumque nam qui alias deserunt earum veniam praesentium? Natus enim officia et aspernatur unde beatae facilis assumenda sunt'
        }
      />
    </div>
  )
}
