import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <nav className={'navigation'}>
        <Link href={'/personal-info'}>Person info</Link>
        <Link href={'/signin'}>Sign In</Link>
        <Link href={'/signup'}>Sign Up</Link>
        <Link href={'/create-new-password'}>Create password</Link>
        <Link href={'/forgot-password'}>Forgot password</Link>
        <Link href={'/verification-link'}>Verification Link</Link>
        <Link href={'/terms'}>Terms</Link>
        <Link href={'/privacy-policy'}>Privacy Policy</Link>
      </nav>
    </div>
  )
}
