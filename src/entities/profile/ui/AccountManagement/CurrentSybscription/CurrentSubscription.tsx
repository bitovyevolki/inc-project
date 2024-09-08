import { Table, Typography } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'

import { GetPaymentsResponse } from '../../../model/types/account.management'

type Props = {
  autoRenewal: boolean
  payments: GetPaymentsResponse[]
}

export const CurrentSubscription = ({ autoRenewal, payments }: Props) => {
  const t = useTranslations('AccountManagement')
  let totalTimeActiveSubscription = 0

  payments.forEach(el => {
    const day = 86400000

    switch (el.subscriptionType) {
      case 'DAY':
        totalTimeActiveSubscription += day
        break
      case 'WEEKLY':
        totalTimeActiveSubscription += 7 * day
        break
      case 'MONTHLY':
        totalTimeActiveSubscription += 30 * day
        break
      default:
        break
    }
  })

  const expireAtDay = (el: GetPaymentsResponse) =>
    new Date(new Date(el.dateOfPayment).getTime() + totalTimeActiveSubscription).toLocaleDateString(
      'ru-RU'
    )

  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>
            <Typography style={{ color: 'var(--color-light-900)' }} variant={'body2'}>
              {t('expire-at')}
            </Typography>
          </Table.HeadCell>
          <Table.HeadCell>
            <Typography style={{ color: 'var(--color-light-900)' }} variant={'body2'}>
              {t('next-payment')}
            </Typography>
          </Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{expireAtDay(payments[0])}</Table.Cell>
          <Table.Cell>{autoRenewal && expireAtDay(payments[0])}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  )
}
