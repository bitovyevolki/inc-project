import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { DatePicker, Input, Select, TextArea } from '@bitovyevolki/ui-kit-int'
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
        <Controller
          control={control}
          name={'userName'}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              errorMessage={error?.message}
              label={'User name'}
              onChange={onChange}
              value={value}
            />
          )}
        />
      </div>
      <div>
        <Controller
          control={control}
          name={'firstName'}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              errorMessage={error?.message}
              label={'First name'}
              onChange={onChange}
              value={value}
            />
          )}
        />
      </div>
      <div>
        <Controller
          control={control}
          name={'lastName'}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              errorMessage={error?.message}
              label={'Last Name'}
              onChange={onChange}
              value={value}
            />
          )}
        />
      </div>
      <div>
        <Controller
          control={control}
          name={'dateOfBirth'}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DatePicker
              date={value}
              error={error?.message}
              label={'Date of birth'}
              onSelect={onChange}
            />
          )}
        />
      </div>
      <div className={s.selectsBox}>
        <div>
          <Controller
            control={control}
            name={'country'}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Select
                onValueChange={onChange}
                options={countryOptions}
                placeholder={'Country'}
                title={'Select your country'}
                value={value}
                variant={'large'}
              />
            )}
          />
        </div>
        <div>
          <Controller
            control={control}
            name={'city'}
            render={({ field: { onChange, value } }) => (
              <Select
                onValueChange={onChange}
                options={cityOptions}
                placeholder={'City'}
                title={'Select your city'}
                value={value}
                variant={'large'}
              />
            )}
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

