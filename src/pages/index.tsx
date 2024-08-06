import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <nav className={'navigation'}>
        <Link href={'/forgot-password'}>Forgot password</Link>
        <Link href={'/expired-link'}>Expired link</Link>
        <Link href={'/signin'}>Sign In</Link>
        <Link href={'/signup'}>Sign Up</Link>
        <Link href={'/create-new-password'}>Create password</Link>
        <Link href={'/personal-info'}>Person info</Link>
      </nav>
    </div>
  )
}
