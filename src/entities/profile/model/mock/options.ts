import { IOption } from '@bitovyevolki/ui-kit-int'

import { ProfileContentType } from '../types/profile'

export const countryOptions: IOption[] = [
  {
    label: 'Russia',
    value: 'russia',
  },
  {
    label: 'Sweden',
    value: 'sweden',
  },
  {
    label: 'USA',
    value: 'usa',
  },
]

export const cityOptions: IOption[] = [
  {
    label: 'Penza',
    value: 'penza',
  },
  {
    label: 'Moscow',
    value: 'moscow',
  },
  {
    label: 'Vladivostok',
    value: 'vladivostok',
  },
]

export const tabsOptions: ({ disabled: boolean } & IOption)[] = [
  { disabled: false, label: 'General', value: ProfileContentType.GENERAL },
  { disabled: false, label: 'Devices', value: ProfileContentType.DEVICES },
  { disabled: false, label: 'Account Management', value: ProfileContentType.MANAGEMENT },
  { disabled: false, label: 'My Payments', value: ProfileContentType.PAYMENTS },
]
