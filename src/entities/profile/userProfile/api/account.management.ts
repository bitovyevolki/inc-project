import { inctagramService } from '@/src/shared/model/inctagram.service'

import {
  CostAndTypePaymentsRequest,
  CreatePaymentRequest,
  CurrentSubscriptionResponse,
  GetPaymentsResponse,
} from '../model/types/account.management'

export const PaymantsService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      autoRenewal: builder.mutation<undefined, void>({
        invalidatesTags: ['Paymants'],
        query: () => {
          return {
            data: { customer: '' },
            method: 'POST',
            url: 'v1/subscriptions/canceled-auto-renewal',
          }
        },
      }),
      canceledAutoRenewal: builder.query<undefined, void>({
        providesTags: ['Paymants'],
        query: () => {
          return {
            method: 'GET',
            url: 'v1/subscriptions/canceled-auto-renewal',
          }
        },
      }),
      createPayments: builder.mutation<any, CreatePaymentRequest>({
        invalidatesTags: ['Paymants'],
        query: data => {
          return {
            body: data,
            method: 'POST',
            url: 'v1/subscriptions',
          }
        },
      }),
      getCostAndTypePayments: builder.query<CostAndTypePaymentsRequest, void>({
        providesTags: ['Paymants'],
        query: () => {
          return {
            method: 'GET',
            url: 'v1/subscriptions/cost-of-payment-subscriptions',
          }
        },
      }),
      getCurrentSubscription: builder.query<CurrentSubscriptionResponse, void>({
        providesTags: ['Paymants'],
        query: () => {
          return {
            method: 'GET',
            url: 'v1/subscriptions/current-payment-subscriptions',
          }
        },
      }),
      getPaymants: builder.query<GetPaymentsResponse[], void>({
        providesTags: ['Paymants'],
        query: () => {
          return {
            method: 'GET',
            url: 'v1/subscriptions/my-payments',
          }
        },
      }),
    }
  },
})

export const {
  useAutoRenewalMutation,
  useCreatePaymentsMutation,
  useGetCostAndTypePaymentsQuery,
  useGetCurrentSubscriptionQuery,
  useGetPaymantsQuery,
} = PaymantsService
