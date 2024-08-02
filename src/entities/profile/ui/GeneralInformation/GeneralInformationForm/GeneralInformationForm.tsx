import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import {
  DatePicker,
  FormDatePicker,
  FormInput,
  FormSelect,
  Select,
  TextArea,
} from '@bitovyevolki/ui-kit-int'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './GeneralInformationForm.module.scss'

import { cityOptions, countryOptions } from '../../../model/mock/options'
import { generalProfileSchema } from '../../../model/schema/general-profile.schema'
import { IProfile } from '../../../model/types/profile'
import { Alert, IAlert } from '../../Alert/Alert'

interface IGeneralFormProps {
  profile: IProfile
}

export const GeneralInformationForm = ({ profile }: IGeneralFormProps) => {
  const [alert, setAlert] = useState<IAlert>({ isShow: false, text: '', variant: 'success' })

  const closeAlertHandler = () => {
    setAlert({ ...alert, isShow: false })
  }

  const { control, handleSubmit } = useForm<Omit<IProfile, 'avatars' | 'createdAt' | 'id'>>({
    defaultValues: {
      ...profile,
    },
    mode: 'onSubmit',
    resolver: zodResolver(generalProfileSchema),
  })

  const onSubmit: SubmitHandler<Omit<IProfile, 'avatars' | 'createdAt' | 'id'>> = data => {
    setAlert({ ...alert, isShow: true, text: 'Your settings are saved!', variant: 'success' })
    console.log(data)

    // if (error) {
    //   setAlert({ ...alert, isShow: true, text: 'Server is not available!', variant: 'error' })
    // }
  }

  return (
    <form className={s.form} id={'general-profile'} onSubmit={handleSubmit(onSubmit)}>
      {alert.isShow && (
        <Alert
          {...alert}
          close={closeAlertHandler}
          style={{ position: 'fixed', right: '60px', top: '60px' }}
        />
      )}
      <div>
        <FormInput control={control} label={'User name'} name={'userName'} />
      </div>
      <div>
        <FormInput control={control} label={'First name'} name={'firstName'} />
      </div>
      <div>
        <FormInput control={control} label={'Last name'} name={'lastName'} />
      </div>
      <div>
        <FormDatePicker control={control} label={'Date of birth'} name={'dateOfBirth'} />
      </div>
      <div className={s.selectsBox}>
        <div>
          <FormSelect
            control={control}
            name={'country'}
            options={countryOptions}
            placeholder={'Country'}
            title={'Select your country'}
            variant={'large'}
          />
        </div>
        <div>
          <FormSelect
            control={control}
            name={'city'}
            options={cityOptions}
            placeholder={'City'}
            title={'Select your city'}
            variant={'large'}
          />
        </div>
      </div>
      <div>
        <Controller
          control={control}
          name={'aboutMe'}
          render={({ field, fieldState: { error } }) => (
            <TextArea errorMessage={error?.message} label={'About me'} {...field} />
          )}
        />
      </div>
    </form>
  )
}
