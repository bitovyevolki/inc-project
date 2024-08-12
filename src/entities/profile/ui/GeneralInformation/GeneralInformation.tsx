import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@bitovyevolki/ui-kit-int'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './GeneralInformation.module.scss'

import { useGetProfileQuery, useUpdateProfileMutation } from '../../api/profile.service'
import {
  GeneralProfileFormValue,
  generalProfileSchema,
} from '../../model/schema/general-profile.schema'
import { Alert, IAlert } from '../Alert/Alert'
import { Loader } from '../Loader/Loader'
import { GeneralInformationForm } from './GeneralInformationForm/GeneralInformationForm'
import { UpdatePhotoBox } from './UpdatePhotoBox/UpdatePhotoBox'

export const GeneralInformation = () => {
  const { data, isLoading } = useGetProfileQuery()
  const [updateProfile, { isLoading: isLoadingUpdate }] = useUpdateProfileMutation()

  const [alert, setAlert] = useState<IAlert>({ isShow: false, text: '', variant: 'success' })

  const closeAlertHandler = () => {
    setAlert({ ...alert, isShow: false })
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<GeneralProfileFormValue>({
    mode: 'onSubmit',
    resolver: zodResolver(generalProfileSchema),
    values: {
      aboutMe: data?.aboutMe ?? '',
      city: data?.city ?? '',
      country: data?.country ?? '',
      dateOfBirth: data?.dateOfBirth ?? null,
      firstName: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
      userName: data?.userName ?? '',
    },
  })

  const onSubmit: SubmitHandler<GeneralProfileFormValue> = async data => {
    try {
      await updateProfile(data).unwrap()

      setAlert({ ...alert, isShow: true, text: 'Your settings are saved!', variant: 'success' })
    } catch (error) {
      setAlert({ ...alert, isShow: true, text: 'Server is not available!', variant: 'error' })
    }
  }

  if (isLoading) {
    return (
      <div className={s.loader}>
        <Loader variant={'large'} />
      </div>
    )
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
        <UpdatePhotoBox avatars={data?.avatars} />
        <GeneralInformationForm control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} />
      </div>
      <div className={s.border} />
      <div className={s.btnBox}>
        <Button
          disabled={Object.keys(errors).length > 0 || isLoadingUpdate}
          form={'general-profile'}
          type={'submit'}
          variant={'primary'}
        >
          {isLoadingUpdate ? (
            <div style={{ display: 'flex', justifyContent: 'center', width: '110px' }}>
              <Loader variant={'small'} />
            </div>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </>
  )
}
