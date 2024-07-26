import s from './GeneralInformation.module.scss'

import { GeneralInformationForm } from './GeneralInformationForm'

export const GeneralInformation = () => {
  return (
    <div className={s.generalInformation}>
      <div className={s.photoBox}>photo</div>
      <GeneralInformationForm />
    </div>
  )
}
