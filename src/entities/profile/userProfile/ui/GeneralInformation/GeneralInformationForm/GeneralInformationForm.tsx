import { Control, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form'

import {
  FormDatePicker,
  FormInput,
  FormSelect,
  FormTextarea,
  IOption,
} from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import s from './GeneralInformationForm.module.scss'

import { GeneralProfileFormValue } from '../../../model/schema/general-profile.schema'

interface IGeneralFormProps {
  control: Control<GeneralProfileFormValue>
  countries: IOption[]
  handleSubmit: UseFormHandleSubmit<GeneralProfileFormValue>
  onSubmit: SubmitHandler<GeneralProfileFormValue>
}

export const GeneralInformationForm = ({
  control,
  countries,
  handleSubmit,
  onSubmit,
}: IGeneralFormProps) => {
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
        <FormDatePicker
          Link={
            <Link className={s.errorLink} href={'/auth/privacy-policy'}>
              Privacy Policy
            </Link>
          }
          control={control}
          label={t('date-of-birth')}
          name={'dateOfBirth'}
        />
      </div>
      <div className={s.selectsBox}>
        <div>
          <FormSelect
            control={control}
            name={'country'}
            options={countries}
            placeholder={t('country')}
            title={t('select-country')}
            variant={'large'}
          />
        </div>
        <FormInput control={control} label={t('enter-city')} name={'city'} />
      </div>
      <div>
        <FormTextarea control={control} label={t('about-me')} name={'aboutMe'} />
      </div>
    </form>
  )
}
