import React from 'react'
// import { Controller, useForm } from 'react-hook-form'

// import { Button, Card, Input, Typography } from '@bitovyevolki/ui-kit-int'
// import { zodResolver } from '@hookform/resolvers/zod'
// import * as z from 'zod'

// import s from './CreateNewPassword.module.scss'

// const schema = z
//   .object({
//     confirmPassword: z
//       .string()
//       .min(6, 'Password must be at least 6 characters long')
//       .max(20, 'Password must be at most 20 characters long'),
//     newPassword: z
//       .string()
//       .min(6, 'Password must be at least 6 characters long')
//       .max(20, 'Password must be at most 20 characters long'),
//   })
//   .refine(data => data.newPassword === data.confirmPassword, {
//     message: 'The passwords must match',
//     path: ['confirmPassword'],
//   })

// export const CreateNewPassword = () => {
//   const {
//     control,
//     formState: { errors },
//     handleSubmit,
//   } = useForm({
//     resolver: zodResolver(schema),
//   })

//   interface FormData {
//     confirmPassword: number | string
//     newPassword: number | string
//   }

//   const onSubmit = (data: FormData) => {
//     console.log(data)
//   }

//   return (
//     <div className={s.wrapper}>
//       <Card className={s.card}>
//         <h3 className={s.text}>Create New Password</h3>
//         <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
//           <Controller
//             control={control}
//             name={'newPassword'}
//             render={({ field }) => (
//               <Input
//                 {...field}
//                 error={errors.newPassword?.message}
//                 onChange={field.onChange}
//                 placeholder={'New password'}
//                 variant={'password'}
//               />
//             )}
//           />
//           <div className={s.space}></div>
//           <Controller
//             control={control}
//             name={'confirmPassword'}
//             render={({ field }) => (
//               <Input
//                 {...field}
//                 error={errors.confirmPassword?.message}
//                 onChange={field.onChange}
//                 placeholder={'Password confirmation'}
//                 variant={'password'}
//               />
//             )}
//           />

//           <Typography className={s.helptext} variant={'body1'}>
//             Your password must be between 6 and 20 characters
//           </Typography>
//           <div className={s.spacer}></div>
//           <Button as={'button'} className={s.btn} fullWidth variant={'primary'}>
//             Create new password
//           </Button>
//         </form>
//       </Card>
//     </div>
//   )
// }
