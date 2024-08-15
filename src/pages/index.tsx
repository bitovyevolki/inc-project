import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <nav className={'navigation'}>
        <Link href={'/personal-info'}>Person info</Link>
        <Link href={'/auth/sign-in'}>Sign in</Link>
        <Link href={'/auth/sign-up'}>Sign up</Link>
        <Link href={'/auth/forgot-password'}>Forgot password</Link>
        <Link href={'/auth/verification-link'}>Verification Link</Link>
        <Link href={'/auth/expired-link'}>Expired link</Link>
        <Link href={'/auth/terms-of-service'}>Terms of service</Link>
        <Link href={'/auth/privacy-policy'}>Privacy policy</Link>
        <Link href={'/auth/registration-confirmation'}>Sign up confirmation</Link>
      </nav>
    </div>
  )
}
