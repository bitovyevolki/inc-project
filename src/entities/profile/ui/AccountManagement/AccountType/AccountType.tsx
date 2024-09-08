import { RadioGroup } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'

type Props = {
  accountType: string
  setAccountType: (value: string) => void
}

export const AccountType = ({ accountType, setAccountType }: Props) => {
  const t = useTranslations('AccountManagement')

  const accountOptions = [
    { label: t('personal'), value: 'Personal' },
    { label: t('business'), value: 'Business' },
  ]

  return (
    <RadioGroup
      onValueChange={setAccountType}
      options={accountOptions}
      value={accountType}
    ></RadioGroup>
  )
}
