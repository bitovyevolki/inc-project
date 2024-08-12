import * as z from 'zod'

export const signInSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .min(6, 'Email must be at least 6 characters long')
    .max(30, 'Email must be at most 30 characters long'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(20, 'Password must be at most 20 characters long')
    .regex(
      /^[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$/,
      'Password can only contain English letters, numbers, and symbols'
    ),
})

export type SignInFormData = z.infer<typeof signInSchema>
