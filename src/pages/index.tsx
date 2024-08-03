import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ paddingBottom: '24px' }}>
      <nav className={'navigation'}>
        <Link href={'/forgot-password'}>Forgot password</Link>
        <Link href={'/signin'}>Sign In</Link>
        <Link href={'/signup'}>Sign Up</Link>
      </nav>
    </div>
  )
}
