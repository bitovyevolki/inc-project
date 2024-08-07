import { PrivacyPolicy } from '@/src/features/auth/privacy-policy/PrivacyPolicy'
import { Button } from '@bitovyevolki/ui-kit-int'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import s from './privacy-policy.page.module.scss'
const inter = Inter({ subsets: ['latin'] })

export default function PrivacyPolicyPage() {
  return (
    <div className={s.page}>
      <div className={s.backButtonContainer}>
        <Link href={'/'}>back</Link>
        <Button as={Link} className={s.backButton} href={'/signup'} variant={'ghost'}>
          {'Back to Sign Up'}
        </Button>
      </div>
      <div className={s.content}>
        <PrivacyPolicy
          text={
            'Text for Privacy Policy Text for Privacy Policy ' +
            'Text for Privacy Policy Text for Privacy Policy Text for Privacy Policy ' +
            'Text for Privacy Policy Text for Privacy Policy Text for Privacy Policy ' +
            'Text for Privacy Policy ' +
            'Text for Privacy Policy Text for Privacy Policy Text for Privacy Policy ' +
            'Text for Privacy Policy'
          }
        />
      </div>
    </div>
  )
}
