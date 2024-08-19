import { useState } from 'react'

import { IOption, Tabs } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'

import '@bitovyevolki/ui-kit-int/dist/style.css'

import s from './Profile.module.scss'

import { ProfileContentType } from '../model/types/profile'
import { GeneralInformation } from './GeneralInformation/GeneralInformation'

export const Profile = () => {
  const [contentType, setContentType] = useState<ProfileContentType>(ProfileContentType.GENERAL)
  const t = useTranslations('GeneralProfile')

  const tabsOptions: ({ disabled: boolean } & IOption)[] = [
    { disabled: false, label: t('general'), value: ProfileContentType.GENERAL },
    { disabled: false, label: t('devices'), value: ProfileContentType.DEVICES },
    { disabled: false, label: t('account-management'), value: ProfileContentType.MANAGEMENT },
    { disabled: false, label: t('my-payments'), value: ProfileContentType.PAYMENTS },
  ]

  const changeContentTypeHandler = (type: ProfileContentType | string) => {
    setContentType(type as ProfileContentType)
  }

  return (
    <div className={s.profile}>
      <div className={s.tabs}>
        <Tabs onChange={changeContentTypeHandler} options={tabsOptions} value={contentType}></Tabs>
      </div>
      {contentType === ProfileContentType.GENERAL && <GeneralInformation />}
      {contentType === ProfileContentType.DEVICES && <div>{t('devices')}</div>}
      {contentType === ProfileContentType.MANAGEMENT && <div>{t('account-management')}</div>}
      {contentType === ProfileContentType.PAYMENTS && <div>{t('my-payments')}</div>}
    </div>
  )
}
