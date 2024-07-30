import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { DatePicker, IOption, Input, Select, TextArea } from '@bitovyevolki/ui-kit-int'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import s from './GeneralInformationForm.module.scss'

import { cityOptions, countryOptions } from '../../../model/mock/options'
import { IProfile } from '../../../model/types/profile'
import { checkAge } from '../../../model/utils/date'
import { Alert } from '../../Alert/Alert'

const schema: z.ZodType<Partial<Omit<IProfile, 'avatars' | 'createdAt' | 'id'>>> = z
  .object({
    aboutMe: z.string().max(200),
    city: z.string().max(20),
    country: z.string().max(20),
    dateOfBirth: z.date().refine(date => checkAge(date), {
      message: 'A user under 13 cannot create a profile. Privacy Policy',
    }),
    firstName: z.string().max(50).min(1),
    lastName: z.string().max(50).min(1),
    userName: z.string().max(30).min(6),
  })
  .partial()

interface IGeneralFormProps {
  profile: IProfile
}

export const GeneralInformationForm = ({ profile }: IGeneralFormProps) => {
  const [alert, setAlert] = useState<{ show: boolean; text: string }>({ show: false, text: '' })

  const closeAlertHandler = () => {
    setAlert({ ...alert, show: false })
  }

  const { control, handleSubmit } = useForm<Omit<IProfile, 'avatars' | 'createdAt' | 'id'>>({
    defaultValues: {
      ...profile,
    },
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<Omit<IProfile, 'avatars' | 'createdAt' | 'id'>> = data => {
    setAlert({ ...alert, show: true, text: 'Your settings are saved!' })
  }

  return (
    <form className={s.form} id={'general-profile'} onSubmit={handleSubmit(onSubmit)}>
      {alert.show && (
        <Alert
          close={closeAlertHandler}
          style={{ position: 'fixed', right: '60px', top: '60px' }}
          text={alert.text}
          variant={'success'}
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
