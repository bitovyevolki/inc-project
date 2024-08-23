import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { RoundLoader } from '@/src/shared/ui/RoundLoader/RoundLoader'
import { Button, IOption } from '@bitovyevolki/ui-kit-int'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'

import s from './GeneralInformation.module.scss'

import { useGetProfileQuery, useUpdateProfileMutation } from '../../api/profile.service'
import countriesJson from '../../model/mock/countries.json'
import {
  GeneralProfileFormValue,
  generalProfileSchema,
} from '../../model/schema/general-profile.schema'
import { GeneralInformationForm } from './GeneralInformationForm/GeneralInformationForm'
import { UpdatePhotoBox } from './UpdatePhotoBox/UpdatePhotoBox'

export const GeneralInformation = () => {
  const t = useTranslations('GeneralProfile')

  const { data, isFetching, isLoading } = useGetProfileQuery()

  const [updateProfile, { isLoading: isLoadingUpdate }] = useUpdateProfileMutation()

  const countries: IOption[] = countriesJson.map(el => ({ label: el.name, value: el.name }))

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

  const btnChildren = isLoadingUpdate ? (
    <div className={s.btnLoaderWrapper}>
      <RoundLoader variant={'small'} />
    </div>
  ) : (
    t('save-changes')
  )

  if (isLoading) {
    return (
      <div className={s.loader}>
        <RoundLoader variant={'large'} />
      </div>
    )
  }

  return (
    <>
      <div className={s.generalInformation}>
        <UpdatePhotoBox avatars={data?.avatars || []} />
        <GeneralInformationForm
          control={control}
          countries={countries || []}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      </div>
      <div className={s.border} />
      <div className={s.btnBox}>
        <Button
          disabled={Object.keys(errors).length > 0 || isLoadingUpdate || isFetching}
          form={'general-profile'}
          type={'submit'}
          variant={'primary'}
        >
          {btnChildren}
        </Button>
      </div>
    </>
  )
}
