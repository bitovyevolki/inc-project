import { ReactElement } from 'react'

import { Profile } from '@/src/entities/profile'
import { LayoutWithSidebar } from '@/src/shared/providers/LayoutWithSidebar/LayoutWithSidebar'

import { NextPageWithLayout } from '../_app'

const PersonalInfo: NextPageWithLayout = () => {
  return <Profile />
}

PersonalInfo.getLayout = function getLayout(page: ReactElement) {
  return <LayoutWithSidebar>{page}</LayoutWithSidebar>
}

export default PersonalInfo
