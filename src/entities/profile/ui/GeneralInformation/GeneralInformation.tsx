import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button } from '@bitovyevolki/ui-kit-int'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './GeneralInformation.module.scss'

import { useGetProfileQuery, useUpdateProfileMutation } from '../../api/profile.service'
import {
  GeneralProfileFormValue,
  generalProfileSchema,
} from '../../model/schema/general-profile.schema'
import { Loader } from '../Loader/Loader'
import { GeneralInformationForm } from './GeneralInformationForm/GeneralInformationForm'
import { UpdatePhotoBox } from './UpdatePhotoBox/UpdatePhotoBox'

export const GeneralInformation = () => {
  const { data, isFetching, isLoading } = useGetProfileQuery()
  const [updateProfile, { isLoading: isLoadingUpdate }] = useUpdateProfileMutation()

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

      toast.success('Your settings are saved!', { position: 'top-right' })
    } catch (error) {
      toast.error('Error! Server is not available!', { position: 'top-right' })
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
      <div className={s.generalInformation}>
        <UpdatePhotoBox avatars={data?.avatars as []} />
        <GeneralInformationForm control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} />
      </div>
      <div className={s.border} />
      <div className={s.btnBox}>
        <Button
          disabled={Object.keys(errors).length > 0 || isLoadingUpdate || isFetching}
          form={'general-profile'}
          type={'submit'}
          variant={'primary'}
        >
          {isLoadingUpdate ? (
            <div className={s.btnLoaderWrapper}>
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
