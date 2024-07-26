'use client'

import { useState } from 'react'

import { IOption, Tabs } from '@bitovyevolki/ui-kit-int'

import s from './Profile.module.scss'

import { ProfileContentType } from '../model/types/profile'
import { GeneralInformation } from './GeneralInformation/GeneralInformation'

const tabsOptions: ({ disabled: boolean } & IOption)[] = [
  { disabled: false, label: 'General', value: ProfileContentType.GENERAL },
  { disabled: false, label: 'Devices', value: ProfileContentType.DEVICES },
  { disabled: false, label: 'Account Management', value: ProfileContentType.MANAGEMENT },
  { disabled: false, label: 'My Payments', value: ProfileContentType.PAYMENTS },
]

export const Profile = () => {
  const [contentType, setContentType] = useState<ProfileContentType>(ProfileContentType.GENERAL)

  const changeContentTypeHandler = (type: ProfileContentType | string) => {
    setContentType(type as ProfileContentType)
  }

  return (
    <div className={s.profile}>
      <div className={s.tabs}>
        <Tabs
          onValueChange={changeContentTypeHandler}
          options={tabsOptions}
          value={contentType}
        ></Tabs>
      </div>
      <div className={s.content}>
        {contentType === ProfileContentType.GENERAL && <GeneralInformation />}
        {contentType === ProfileContentType.DEVICES && <div>devices</div>}
        {contentType === ProfileContentType.MANAGEMENT && <div>Management</div>}
        {contentType === ProfileContentType.PAYMENTS && <div>payments</div>}
      </div>
    </div>
  )
}
