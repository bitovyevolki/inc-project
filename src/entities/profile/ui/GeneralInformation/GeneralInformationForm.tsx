import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { DatePicker, IOption, Input, Select, TextArea } from '@bitovyevolki/ui-kit-int'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import s from './GeneralInformation.module.scss'

import { IProfile } from '../../model/types/profile'

const countryOptions: IOption[] = [
  {
    label: 'Russia',
    value: 'russia',
  },
  {
    label: 'Sweden',
    value: 'sweden',
  },
  {
    label: 'USA',
    value: 'usa',
  },
]

const cityOptions: IOption[] = [
  {
    label: 'Penza',
    value: 'penza',
  },
  {
    label: 'Moscow',
    value: 'moscow',
  },
  {
    label: 'Vladivostok',
    value: 'vladivostok',
  },
]

const schema: z.ZodType<Partial<Omit<IProfile, 'avatars' | 'createdAt' | 'id'>>> = z
  .object({
    aboutMe: z.string().max(100),
    city: z.string().max(20),
    country: z.string().max(20),
    dateOfBirth: z.date(),
    firstName: z.string().max(20).min(2),
    lastName: z.string().max(20).min(2),
    userName: z.string().max(20).min(2),
  })
  .partial()

export const GeneralInformationForm = () => {
  const { control, handleSubmit } = useForm<IProfile>({
    defaultValues: {},
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<IProfile> = data => {
    alert(JSON.stringify(data))
  }

  return (
    <form className={s.form} id={'general-profile'} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          control={control}
          name={'userName'}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              error={error?.message}
              onChange={onChange}
              placeholder={'Username'}
              value={value}
              variant={'base'}
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
              error={error?.message}
              onChange={onChange}
              placeholder={'First Name'}
              value={value}
              variant={'base'}
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
              error={error?.message}
              onChange={onChange}
              placeholder={'Last Name'}
              value={value}
              variant={'base'}
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
                // placeholder={'Country'}
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
                title={'Select your city'}
                // placeholder={'City'}
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
