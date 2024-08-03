import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { object, string, z } from 'zod'

const signUpSchema = object({
  agreeToTerms: z
    .boolean({
      required_error: 'You must agree to the terms and policy.',
    })
    .refine(val => val, {
      message: 'You must agree to the terms and policy.',
    }),
  confirmPassword: string().min(1, 'Please confirm your password.'),
  email: string()
    .min(1, "Email field can't be empty.")
    .email('Email must follow the format example@example.com.'),
  password: string()
    .min(6, 'Password must be at least 6 characters long.')
    .max(20, 'Password must be at most 20 characters long.')
    .regex(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[0-9A-Za-z!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+$/,
      'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character.'
    ),
  userName: string()
    .min(1, 'Username field cannot be empty.')
    .min(6, 'Username must be at least 6 characters long.')
    .max(30, 'Username must be at most 30 characters long.')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, underscores, or dashes.'
    ),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords must match.',
  path: ['confirmPassword'],
})

export { signUpSchema }

export type SignUpFormValues = z.infer<typeof signUpSchema>
export const useSignUpForm = () => {
  return useForm<SignUpFormValues>({
    defaultValues: {
      agreeToTerms: false,
      confirmPassword: '',
      email: '',
      password: '',
      userName: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(signUpSchema),
  })
}
