export type SubscriptionType = 'DAY' | 'MONTHLY' | 'WEEKLY'
export type PaymentType = 'CREDIT_CARD' | 'PAYPAL' | 'STRIPE'

export type CreatePaymentRequest = {
  amount: number
  baseUrl: string
  paymentType: PaymentType
  typeSubscription: SubscriptionType
}

export type CostAndType = {
  amount: number
  typeDescription: SubscriptionType
}

export type CostAndTypePaymentsRequest = {
  data: CostAndType[]
}

type CurrentSubscriptionData = {
  autoRenewal: boolean
  dateOfPayment: string
  endDateOfSubscription: string
  subscriptionId: string
  userId: number
}

export type CurrentSubscriptionResponse = {
  data: CurrentSubscriptionData[]
  hasAutoRenewal: boolean
}

export type GetPaymentsResponse = {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: PaymentType
  price: 0
  subscriptionId: string
  subscriptionType: SubscriptionType
  userId: number
}
