import * as React from 'react'
import { ComponentPropsWithoutRef } from 'react'
import { Control, FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Input } from '@bitovyevolki/ui-kit-int'

type InputVariantType = 'base' | 'password' | 'search'

type MyInputPropsType = {
  className?: string
  disabled?: boolean
  error?: string
  onChange: (value: string) => void
  value: string
  variant: InputVariantType
} & Omit<ComponentPropsWithoutRef<'input'>, 'onChange' | 'type'>

type Props<T extends FieldValues> = { control: Control } & Omit<
  MyInputPropsType,
  'onChange' | 'value'
> &
  Omit<UseControllerProps<T>, 'control' | 'defaultValue' | 'rules'>

export const FormInput = <T extends FieldValues>({
  control,
  disabled,
  name,
  shouldUnregister,
  ...restProps
}: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, disabled, name, shouldUnregister })

  return <Input error={error?.message} {...field} {...restProps} />
}
