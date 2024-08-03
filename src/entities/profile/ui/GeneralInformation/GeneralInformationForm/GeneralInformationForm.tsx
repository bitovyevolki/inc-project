import { Control, Controller, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form'

import { FormDatePicker, FormInput, FormSelect, TextArea } from '@bitovyevolki/ui-kit-int'

import s from './GeneralInformationForm.module.scss'

import { cityOptions, countryOptions } from '../../../model/mock/options'
import { GeneralProfileFormType } from '../../../model/types/profile'

interface IGeneralFormProps {
  control: Control<GeneralProfileFormType>
  handleSubmit: UseFormHandleSubmit<GeneralProfileFormType>
  onSubmit: SubmitHandler<GeneralProfileFormType>
}

export const GeneralInformationForm = ({ control, handleSubmit, onSubmit }: IGeneralFormProps) => {
  return (
    <form className={s.form} id={'general-profile'} onSubmit={handleSubmit(onSubmit)}>
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
