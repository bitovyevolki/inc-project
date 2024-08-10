import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@bitovyevolki/ui-kit-int'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './GeneralInformation.module.scss'

import { mockProfile } from '../../model/mock/profile'
import { generalProfileSchema } from '../../model/schema/general-profile.schema'
import { GeneralProfileFormType } from '../../model/types/profile'
import { Alert, IAlert } from '../Alert/Alert'
import { GeneralInformationForm } from './GeneralInformationForm/GeneralInformationForm'
import { UpdatePhotoBox } from './UpdatePhotoBox/UpdatePhotoBox'

export const GeneralInformation = () => {
  const profile = mockProfile

  const [alert, setAlert] = useState<IAlert>({ isShow: false, text: '', variant: 'success' })

  const closeAlertHandler = () => {
    setAlert({ ...alert, isShow: false })
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<GeneralProfileFormType>({
    defaultValues: {
      ...profile,
    },
    mode: 'onSubmit',
    resolver: zodResolver(generalProfileSchema),
  })

  const onSubmit: SubmitHandler<GeneralProfileFormType> = data => {
    setAlert({ ...alert, isShow: true, text: 'Your settings are saved!', variant: 'success' })

    // if (error) {
    //   setAlert({ ...alert, isShow: true, text: 'Server is not available!', variant: 'error' })
    // }
  }

  return (
    <>
      {alert.isShow && (
        <Alert
          {...alert}
          close={closeAlertHandler}
          style={{ position: 'fixed', right: '60px', top: '60px' }}
        />
      )}
      <div className={s.generalInformation}>
        <UpdatePhotoBox />
        <GeneralInformationForm control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} />
      </div>
      <div className={s.border} />
      <div className={s.btnBox}>
        <Button
          disabled={Object.keys(errors).length > 0}
          form={'general-profile'}
          type={'submit'}
          variant={'primary'}
        >
          Save Changes
        </Button>
      </div>
    </>
  )
}
