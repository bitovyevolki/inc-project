import * as React from 'react'

import s from './loader.module.scss'

export const Loader = () => {
  return (
    <div className={s.container}>
      <span className={s.loader}></span>
    </div>
  )
}
