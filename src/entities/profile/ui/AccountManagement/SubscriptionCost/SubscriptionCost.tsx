import { RadioGroup } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'

import { CostAndType } from '../../../model/types/account.management'

type Props = {
  costs: string
  data: CostAndType[]
  setCosts: (value: string) => void
}

export const SubscriptionCost = ({ costs, data, setCosts }: Props) => {
  const t = useTranslations('AccountManagement')

  const costsOptions = [
    {
      label: `$${data[0].amount} ${t('per')} 1 ${t('day')}`,
      typeSubscription: data[0].typeDescription,
      value: '10',
    },
    {
      label: `$${data[1].amount} ${t('per')} 7 ${t('days')}`,
      typeSubscription: data[1].typeDescription,
      value: '50',
    },
    {
      label: `$${data[2].amount} ${t('per')} 1 ${t('month')}`,
      typeSubscription: data[2].typeDescription,
      value: '100',
    },
  ]

  return (
    <>
      <RadioGroup onValueChange={setCosts} options={costsOptions} value={costs}></RadioGroup>
    </>
  )
}
