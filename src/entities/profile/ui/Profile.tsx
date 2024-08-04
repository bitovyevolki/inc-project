import { useState } from 'react'

import { Tabs } from '@bitovyevolki/ui-kit-int'

import '@bitovyevolki/ui-kit-int/dist/style.css'

import s from './Profile.module.scss'

import { tabsOptions } from '../model/mock/options'
import { ProfileContentType } from '../model/types/profile'
import { GeneralInformation } from './GeneralInformation/GeneralInformation'

export const Profile = () => {
  const [contentType, setContentType] = useState<ProfileContentType>(ProfileContentType.GENERAL)

  const changeContentTypeHandler = (type: ProfileContentType | string) => {
    setContentType(type as ProfileContentType)
  }

  return (
    <div className={s.profile}>
      <div className={s.tabs}>
        <Tabs onChange={changeContentTypeHandler} options={tabsOptions} value={contentType}></Tabs>
      </div>
      {contentType === ProfileContentType.GENERAL && <GeneralInformation />}
      {contentType === ProfileContentType.DEVICES && <div>devices</div>}
      {contentType === ProfileContentType.MANAGEMENT && <div>Management</div>}
      {contentType === ProfileContentType.PAYMENTS && <div>payments</div>}
    </div>
  )
}
