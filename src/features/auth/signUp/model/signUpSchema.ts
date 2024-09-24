import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { object, string, z } from 'zod'

const getSignUpSchema = (language: 'en' | 'ru') => {
  const translations = {
    en: {
      agreeToTerms: 'You must agree to the terms and policy.',
      confirmPassword: 'Please confirm your password.',
      emailEmpty: "Email field can't be empty.",
      emailInvalid: 'Email must follow the format example@example.com.',
      passwordComplexity:
        'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character.',
      passwordMax: 'Password must be at most 20 characters long.',
      passwordMin: 'Password must be at least 6 characters long.',
      passwordsMismatch: 'Passwords must match.',
      userNameEmpty: 'Username field cannot be empty.',
      userNameInvalid: 'Username can only contain letters, numbers, underscores, or dashes.',
      userNameMax: 'Username must be at most 30 characters long.',
      userNameMin: 'Username must be at least 6 characters long.',
    },
    ru: {
      agreeToTerms: 'Вы должны согласиться с условиями и политикой.',
      confirmPassword: 'Пожалуйста, подтвердите свой пароль.',
      emailEmpty: 'Поле электронной почты не может быть пустым.',
      emailInvalid: 'Электронная почта должна быть в формате example@example.com.',
      passwordComplexity:
        'Пароль должен содержать как минимум одну цифру, одну заглавную букву, одну строчную букву и один специальный символ.',
      passwordMax: 'Пароль должен содержать не более 20 символов.',
      passwordMin: 'Пароль должен содержать не менее 6 символов.',
      passwordsMismatch: 'Пароли должны совпадать.',
      userNameEmpty: 'Поле имени пользователя не может быть пустым.',
      userNameInvalid:
        'Имя пользователя может содержать только буквы, цифры, подчеркивания или дефисы.',
      userNameMax: 'Имя пользователя должно содержать не более 30 символов.',
      userNameMin: 'Имя пользователя должно содержать не менее 6 символов.',
    },
  }

  const t = translations[language]

  return object({
    agreeToTerms: z
      .boolean({
        required_error: t.agreeToTerms,
      })
      .refine(val => val, {
        message: t.agreeToTerms,
      }),
    confirmPassword: string().min(1, t.confirmPassword),
    email: string().min(1, t.emailEmpty).email(t.emailInvalid),
    password: string()
      .min(6, t.passwordMin)
      .max(20, t.passwordMax)
      .regex(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[0-9A-Za-z!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+$/,
        t.passwordComplexity
      ),
    userName: string()
      .min(1, t.userNameEmpty)
      .min(6, t.userNameMin)
      .max(30, t.userNameMax)
      .regex(/^[a-zA-Z0-9_-]+$/, t.userNameInvalid),
  }).refine(data => data.password === data.confirmPassword, {
    message: t.passwordsMismatch,
    path: ['confirmPassword'],
  })
}

export type SignUpFormValues = z.infer<ReturnType<typeof getSignUpSchema>>

export const useSignUpForm = (language: 'en' | 'ru') => {
  return useForm<SignUpFormValues>({
    defaultValues: {
      agreeToTerms: false,
      confirmPassword: '',
      email: '',
      password: '',
      userName: '',
    },
    mode: 'onChange',
    resolver: zodResolver(getSignUpSchema(language)),
  })
}
