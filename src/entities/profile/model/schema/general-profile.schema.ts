import * as z from 'zod'

import { GeneralProfileFormType } from '../types/profile'
import { checkAge } from '../utils/date'

export const generalProfileSchema: z.ZodType<Partial<GeneralProfileFormType>> = z.object({
  aboutMe: z.string().max(200).optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  dateOfBirth: z
    .date()
    .refine(date => checkAge(date), {
      message: 'A user under 13 cannot create a profile. Privacy Policy',
    })
    .optional(),
  firstName: z
    .string()
    .max(50)
    .min(1)
    .refine(
      value => /^[а-яА-ЯёЁa-zA-Z]+$/.test(value ?? ''),
      'First name should contain only alphabets'
    ),
  lastName: z
    .string()
    .max(50)
    .min(1)
    .refine(
      value => /^[а-яА-ЯёЁa-zA-Z]+$/.test(value ?? ''),
      'Last name should contain only alphabets'
    ),
  userName: z
    .string()
    .max(30)
    .min(6)
    .refine(
      value => /^[-_a-zA-Z0-9]+$/.test(value ?? ''),
      'User name should contain only latin alphabets, numbers and symbols - or _'
    ),
})
