import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { DatePicker, Input, Select, TextArea } from '@bitovyevolki/ui-kit-int'

import s from './GeneralInformation.module.scss'

import { IProfile } from '../../model/types/profile'

export const GeneralInformationForm = () => {
  const { control, handleSubmit } = useForm<IProfile>({
    defaultValues: {},
    mode: 'onSubmit',
  })

  const onSubmit: SubmitHandler<IProfile> = data => {
    alert(JSON.stringify(data))
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.box}>
        <Controller
          control={control}
          name={'userName'}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              error={error?.message}
              onChange={onChange}
              placeholder={'Имя'}
              value={value}
              variant={'base'}
            />
          )}
        />
      </div>
      <div className={s.box}>
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
      <div className={s.box}>
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
      <div className={s.box}>
        <Controller
          control={control}
          name={'dateOfBirth'}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DatePicker date={value} onSelect={onChange} />
          )}
        />
      </div>
      <div className={s.selectsBox}>
        {/* <Controller
       control={control}
       name={'country'}
       render={({ field: { onChange, value }, fieldState: { error } }) => <Select />}
     />

     <Controller
       control={control}
       name={'city'}
       render={({ field: { onChange, value }, fieldState: { error } }) => <Select />}
     /> */}
      </div>
      <div className={s.box}>
        <Controller
          control={control}
          name={'aboutMe'}
          render={({ field: { onChange, value }, fieldState: { error } }) => <TextArea />}
        />
      </div>
    </form>
  )
}
