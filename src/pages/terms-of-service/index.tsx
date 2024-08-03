
import { TermsOfService } from '@/src/features/auth/terms-of-service/TermsOfService'
import { Button } from '@bitovyevolki/ui-kit-int'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import s from './terms-of-service.page.module.scss'
const inter = Inter({ subsets: ['latin'] })

export default function PrivacyPolicyPage() {
  return (
    <div className={s.page}>
      <div className={s.backButtonContainer}>
        <Button as={Link} className={s.backButton} href={'/signup'} variant={'ghost'}>
          {'Back to Sign Up'}
        </Button>
      </div>
      <div className={s.content}>
        <TermsOfService
          text={
            'Text for Terms of Service Text for Terms of Service Text for Terms of Service ' +
            'Text for Terms of Service Text for Terms of Service Text for Terms of Service' +
            'Text for Terms of Service Text for Terms of Service Text for Terms of Service' +
            'Text for Terms of Service Text for Terms of Service Text for Terms of Service'
          }
        />
      </div>
    </div>
  )
}
