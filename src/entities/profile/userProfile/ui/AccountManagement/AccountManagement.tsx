import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { PaypalIcon } from '@/src/shared/assets/icons/paypal'
import { StripeIcon } from '@/src/shared/assets/icons/stripe'
import { RoundLoader } from '@/src/shared/ui/RoundLoader/RoundLoader'
import { Button, Checkbox, ModalWindow, Typography } from '@bitovyevolki/ui-kit-int'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

import s from './AccountManagement.module.scss'

import {
  useAutoRenewalMutation,
  useCreatePaymentsMutation,
  useGetCostAndTypePaymentsQuery,
  useGetCurrentSubscriptionQuery,
  useGetPaymantsQuery,
} from '../../api/account.management'
import { PaymentType } from '../../model/types/account.management'
import { AccountType } from './AccountType/AccountType'
import { CurrentSubscription } from './CurrentSybscription/CurrentSubscription'
import { SubscriptionCost } from './SubscriptionCost/SubscriptionCost'

// For test pay:
// STRIPE - Card number 4242 4242 4242 4242. For the remaining details, you can enter any values.
// PayPal - enter test account: sb-ppuas31893847@personal.example.com password: V}!7OpkG

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

const AccountManagement = () => {
  const t = useTranslations('AccountManagement')
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [modalContent, setModalContent] = useState({ buttonText: '', text: '', title: '' })

  const {
    data,
    isError: isErrorGetCost,
    isLoading: isLoadingGetCost,
  } = useGetCostAndTypePaymentsQuery()

  const { data: payments, isLoading: isLoadingPayments } = useGetPaymantsQuery()
  const { data: currentSubscription } = useGetCurrentSubscriptionQuery()

  const [
    createPayments,
    { isError: isErrorCreatePayments, isLoading: isLoadingCreatePayments, isSuccess },
  ] = useCreatePaymentsMutation()

  const [autoRenewalRequest, { isError: isErrorAutoRenewal, isLoading: isLoadingAutoRenewal }] =
    useAutoRenewalMutation()

  const [accountType, setAccountType] = useState('Personal')
  const [costs, setCosts] = useState('10')
  const [autoRenewal, setAutoRenewal] = useState(false)

  useEffect(() => {
    if (currentSubscription) {
      setAccountType('Business')
      setAutoRenewal(currentSubscription.hasAutoRenewal)
    }
  }, [currentSubscription])

  const router = useRouter()

  useEffect(() => {
    const { query } = router

    const openModal = (title: string, text: string, buttonText: string) => {
      setIsOpenModal(true)
      setModalContent({
        buttonText,
        text,
        title,
      })
    }

    if (query.PayerID || query.success === 'true') {
      router.push('/personal-info')
      openModal(t('modal.title-success'), t('modal.text-success'), t('modal.button-success'))
    } else if (query.success === 'false' || (query.token && !query.PayerID)) {
      router.push('/personal-info')
      openModal(t('modal.title-failed'), t('modal.text-failed'), t('modal.button-failed'))
    }
  }, [router, router.query, t])

  if (isLoadingGetCost || isLoadingPayments || isLoadingCreatePayments || isSuccess) {
    return (
      <div className={s.loader}>
        <RoundLoader variant={'large'} />
      </div>
    )
  }

  const onClickAutoRenewal = () => {
    autoRenewalRequest()
    setAutoRenewal(prev => !prev)
  }

  const onPaymentSuccess = (paymentType: PaymentType) => {
    // eslint-disable-next-line no-nested-ternary
    const typeSubscription = costs === '100' ? 'MONTHLY' : costs === '50' ? 'WEEKLY' : 'DAY'
    const currentUrl = window.location.href

    createPayments({
      amount: Number(costs),
      baseUrl: currentUrl,
      paymentType,
      typeSubscription,
    })
      .unwrap()
      .then(data => {
        const url = data?.url

        if (url) {
          window.location.href = url
          window.addEventListener('message', event => {
            if (event.origin !== window.location.origin) {
              return
            }
          })
        }
      })
      .catch(error => {
        setIsOpenModal(true)
        setModalContent({
          buttonText: t('modal.button-failed'),
          text: t('modal.text-failed'),
          title: t('modal.title-failed'),
        })
      })
  }

  const havePayments = payments && payments.length > 0

  if (isErrorAutoRenewal || isErrorCreatePayments || isErrorGetCost) {
    toast.error('Unknowт error')
  }

  return (
    <PayPalScriptProvider
      options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string }}
    >
      <Elements stripe={stripePromise}>
        <div className={s.wrapper}>
          {havePayments && (
            <div>
              <Typography variant={'h4'}>{t('current-subscription')}:</Typography>
              <div className={s.block}>
                <CurrentSubscription autoRenewal={autoRenewal} payments={payments} />
              </div>
              {accountType === 'Business' && (
                <Checkbox
                  checked={autoRenewal}
                  className={s.autoRenewal}
                  disabled={isLoadingAutoRenewal}
                  label={t('auto-renewal')}
                  onChange={onClickAutoRenewal}
                />
              )}
            </div>
          )}

          <div>
            <Typography variant={'h4'}>{t('account-type-title')}:</Typography>
            <div className={s.block}>
              <AccountType accountType={accountType} setAccountType={setAccountType} />
            </div>
          </div>
          {accountType === 'Business' && (
            <div>
              <Typography variant={'h4'}>{t('subscription-cost')}:</Typography>
              <div className={s.block}>
                {data && <SubscriptionCost costs={costs} data={data?.data} setCosts={setCosts} />}
              </div>
              <div className={s.wrapperPayments}>
                <div className={s.payments}>
                  <Button
                    className={s.block}
                    onClick={() => onPaymentSuccess('PAYPAL')}
                    variant={'ghost'}
                  >
                    <PaypalIcon />
                  </Button>
                  <p>{t('or')}</p>
                  <Button
                    className={s.block}
                    onClick={() => onPaymentSuccess('STRIPE')}
                    variant={'ghost'}
                  >
                    <StripeIcon />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <ModalWindow onOpenChange={setIsOpenModal} open={isOpenModal} title={modalContent.title}>
          <div className={s.modal}>
            <p>{modalContent.text}</p>
            <Button fullWidth onClick={() => setIsOpenModal(false)} variant={'primary'}>
              {modalContent.buttonText}
            </Button>
          </div>
        </ModalWindow>
      </Elements>
    </PayPalScriptProvider>
  )
}

export default AccountManagement
