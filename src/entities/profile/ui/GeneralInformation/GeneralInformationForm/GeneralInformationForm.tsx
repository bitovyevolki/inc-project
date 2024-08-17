import { Control, Controller, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form'

import { FormDatePicker, FormInput, FormSelect, TextArea } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'

import s from './GeneralInformationForm.module.scss'

import { cityOptions, countryOptions } from '../../../model/mock/options'
import { GeneralProfileFormValue } from '../../../model/schema/general-profile.schema'

interface IGeneralFormProps {
  control: Control<GeneralProfileFormValue>
  handleSubmit: UseFormHandleSubmit<GeneralProfileFormValue>
  onSubmit: SubmitHandler<GeneralProfileFormValue>
}

export const GeneralInformationForm = ({ control, handleSubmit, onSubmit }: IGeneralFormProps) => {
  const t = useTranslations('GeneralProfile')

  return (
    <form className={s.form} id={'general-profile'} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FormInput control={control} label={t('user-name')} name={'userName'} />
      </div>
      <div>
        <FormInput control={control} label={t('first-name')} name={'firstName'} />
      </div>
      <div>
        <FormInput control={control} label={t('last-name')} name={'lastName'} />
      </div>
      <div>
        <FormDatePicker control={control} label={t('date-of-birth')} name={'dateOfBirth'} />
      </div>
      <div className={s.selectsBox}>
        <div>
          <FormSelect
            control={control}
            name={'country'}
            options={countryOptions}
            placeholder={t('country')}
            title={t('select-country')}
            variant={'large'}
          />
        </div>
        <div>
          <FormSelect
            control={control}
            name={'city'}
            options={cityOptions}
            placeholder={t('city')}
            title={t('select-city')}
            variant={'large'}
          />
        </div>
      </div>
      <div>
        <Controller
          control={control}
          name={'aboutMe'}
          render={({ field, fieldState: { error } }) => (
            <TextArea errorMessage={error?.message} label={t('about-me')} {...field} />
          )}
        />
      </div>
    </form>
  )
}
