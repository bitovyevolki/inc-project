import { ReactNode } from 'react'

import s from './LayoutWithSidebar.module.scss'

import { Sidebar } from '../../ui/Sidebar/Sidebar'

interface IProps {
  children: ReactNode
}

export const LayoutWithSidebar = ({ children }: IProps) => {
  return (
    <div className={s.layout}>
      <Sidebar />
      {children}
    </div>
  )
}
