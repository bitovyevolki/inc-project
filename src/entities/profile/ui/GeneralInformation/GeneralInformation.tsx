import { Button } from '@bitovyevolki/ui-kit-int'

import s from './GeneralInformation.module.scss'

import { GeneralInformationForm } from './GeneralInformationForm'
import { UpdatePhotoBox } from './UpdatePhotoBox/UpdatePhotoBox'

export const GeneralInformation = () => {
  return (
    <>
      <div className={s.generalInformation}>
        <UpdatePhotoBox />
        <GeneralInformationForm />
      </div>
      <div className={s.border}></div>
      <div className={s.btnBox}>
        <Button form={'general-profile'} type={'submit'} variant={'primary'}>
          Save Changes
        </Button>
      </div>
    </>
  )
}
