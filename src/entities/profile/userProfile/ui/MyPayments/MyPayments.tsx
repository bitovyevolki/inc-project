'use client'

import { toast } from 'react-toastify'

import { RoundLoader } from '@/src/shared/ui/RoundLoader/RoundLoader'
import { Table, Typography } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'

import s from './MyPayments.module.scss'

import { useGetPaymantsQuery } from '../../api/account.management'
import { getDateViewWithDots } from '../../lib/utils/date'

export const MyPayments = () => {
  const t = useTranslations('MyPayments')

  const { data, isError, isLoading } = useGetPaymantsQuery()

  if (isError) {
    toast.error('My payments error')
  }

  if (isLoading) {
    return (
      <div className={s.centerBox}>
        <RoundLoader variant={'large'} />
      </div>
    )
  }

  const havePayments = data && data.length > 0

  if (!havePayments) {
    return (
      <div className={s.centerBox}>
        <Typography variant={'h2'}>{t('no-payments')}</Typography>
      </div>
    )
  }

  return (
    <div className={s.myPayments}>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>{t('date-of-payment')}</Table.HeadCell>
            <Table.HeadCell>{t('end-date-of-subscription')}</Table.HeadCell>
            <Table.HeadCell>{t('price')}</Table.HeadCell>
            <Table.HeadCell>{t('subscription-type')}</Table.HeadCell>
            <Table.HeadCell>{t('payment-type')}</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.map(p => (
            <Table.Row key={p.subscriptionId + Math.random()}>
              <Table.Cell>{getDateViewWithDots(new Date(p.dateOfPayment))}</Table.Cell>
              <Table.Cell>{getDateViewWithDots(new Date(p.endDateOfSubscription))}</Table.Cell>
              <Table.Cell>{p.price}</Table.Cell>
              <Table.Cell>{p.subscriptionType}</Table.Cell>
              <Table.Cell>{p.paymentType}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
