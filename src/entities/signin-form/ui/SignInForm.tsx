import React from 'react'
import { Card, Input, Button, Typography } from '@bitovyevolki/ui-kit-int'
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import s from './SignInForm.module.scss'
import Link from 'next/link'

const schema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .min(6, 'Email must be at least 6 characters long')
    .max(50, 'Email must be at most 30 characters long'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(20, 'Password must be at most 20 characters long'),
})

type FormData = z.infer<typeof schema>

export const SignInForm = () => {
  const { control, handleSubmit, setError } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const { errors } = useFormState({ control })

  const onSubmit: SubmitHandler<FormData> = data => {
    // Симуляция ошибки логина
    if (data.email !== 'test@example.com' || data.password !== 'password') {
      setError('password', {
        type: 'manual',
        message: 'The email or password are incorrect. Try again please',
      })
    } else {
      console.log('Logged in successfully')
    }
  }

  return (
    <div className={s.wrapper}>
      <Card className={s.card}>
        <Typography variant={'h2'}>Sign In</Typography>

        <div className={s.blockWithIcons}>
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_3800_11376)">
              <path
                d="M7.89918 14.6468C9.29806 10.4079 13.2816 7.36364 17.9999 7.36364C20.5362 7.36364 22.8272 8.26364 24.6272 9.73636L29.8635 4.5C26.6726 1.71818 22.5817 0 17.9999 0C10.905 0 4.7965 4.04745 1.85986 9.97504L7.89918 14.6468Z"
                fill="#EA4335"
              />
              <path
                d="M24.0609 27.0189C22.4261 28.0744 20.3489 28.6364 17.9998 28.6364C13.2995 28.6364 9.32844 25.6153 7.91524 21.4018L1.85596 26.0025C4.78895 31.9404 10.8973 36 17.9998 36C22.399 36 26.6028 34.4361 29.7511 31.4994L24.0609 27.0189Z"
                fill="#34A853"
              />
              <path
                d="M29.7513 31.4994C33.0438 28.4282 35.1818 23.8555 35.1818 18C35.1818 16.9364 35.0182 15.7909 34.7727 14.7273H18V21.6818H27.6545C27.1782 24.0204 25.8995 25.8318 24.0611 27.0189L29.7513 31.4994Z"
                fill="#4A90E2"
              />
              <path
                d="M7.91547 21.4018C7.55749 20.3345 7.36364 19.1906 7.36364 18C7.36364 16.8274 7.55165 15.7002 7.8993 14.6468L1.85999 9.97504C0.654881 12.3906 0 15.1131 0 18C0 20.8793 0.667171 23.5953 1.85619 26.0025L7.91547 21.4018Z"
                fill="#FBBC05"
              />
            </g>
            <defs>
              <clipPath id="clip0_3800_11376">
                <rect width="36" height="36" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_3800_11377)">
              <path
                d="M17.7136 0.720007H17.8475C21.076 0.720007 24.0971 1.60273 26.6848 3.13921L26.6056 3.09457C29.2998 4.66993 31.4814 6.85153 33.0121 9.46225L33.0568 9.54577C34.5544 12.0931 35.4385 15.156 35.4385 18.4248C35.4385 26.2094 30.423 32.8248 23.4477 35.2123L23.3224 35.2498C23.2317 35.2786 23.128 35.2944 23.0214 35.2944C22.7881 35.2944 22.5721 35.2166 22.3979 35.087L22.4008 35.0885C22.2165 34.9229 22.1013 34.6838 22.1013 34.4174C22.1013 34.4102 22.1013 34.403 22.1013 34.3973V34.3987C22.1013 34.3526 22.1051 33.7642 22.1128 32.6333C22.1205 31.5024 22.1243 30.4685 22.1243 29.5315C22.1344 29.4235 22.1401 29.2997 22.1401 29.173C22.1401 28.0325 21.675 27.0014 20.9248 26.257C21.8147 26.1691 22.6182 26.0222 23.3987 25.8178L23.2893 25.8422C24.1144 25.6118 24.8344 25.3051 25.5025 24.9178L25.4579 24.9422C26.1894 24.539 26.8086 24.0264 27.3184 23.4187L27.327 23.4086C27.8627 22.7232 28.2817 21.9168 28.5366 21.0398L28.5496 20.9894C28.8505 20.0059 29.0233 18.8755 29.0233 17.7048C29.0233 17.64 29.0233 17.5738 29.0219 17.509V17.519C29.0219 17.4874 29.0233 17.4514 29.0233 17.4154C29.0233 15.6182 28.3293 13.9838 27.196 12.7642L27.2003 12.7685C27.4422 12.1349 27.5819 11.4034 27.5819 10.6387C27.5819 9.70417 27.3731 8.82001 27.0001 8.02657L27.016 8.06401C26.8504 8.03233 26.6617 8.01361 26.4673 8.01361C25.9864 8.01361 25.5328 8.12593 25.1296 8.32465L25.1469 8.31745C24.3289 8.61985 23.6291 8.96257 22.9696 9.36289L23.0243 9.33121L22.1473 9.88417C20.8197 9.50401 19.2947 9.28513 17.7193 9.28513C16.144 9.28513 14.619 9.50401 13.1733 9.91297L13.2899 9.88417C13.0441 9.71521 12.7173 9.50737 12.3093 9.26065C11.7722 8.95249 11.1371 8.65441 10.4776 8.40385L10.3825 8.37217C9.96063 8.15041 9.46095 8.02081 8.92959 8.02081C8.75103 8.02081 8.57535 8.03521 8.40543 8.06401L8.42415 8.06113C8.06703 8.81569 7.85823 9.70129 7.85823 10.6358C7.85823 11.4005 7.99791 12.1334 8.25423 12.8088L8.23983 12.767C7.10943 13.9824 6.41679 15.6168 6.41679 17.4139C6.41679 17.4499 6.41679 17.4874 6.41823 17.5234V17.5176C6.41679 17.5738 6.41679 17.6386 6.41679 17.7048C6.41679 18.8698 6.58959 19.9958 6.91215 21.0557L6.89055 20.9736C7.16271 21.8995 7.57599 22.7045 8.11455 23.4115L8.10159 23.3928C8.61135 24.0192 9.22767 24.5347 9.92607 24.9221L9.95775 24.9379C10.5798 25.3008 11.3013 25.6075 12.0601 25.8221L12.1264 25.8379C12.7974 26.0179 13.6009 26.1648 14.4232 26.2469L14.4894 26.2526C13.8688 26.869 13.4555 27.6926 13.3605 28.6114L13.359 28.6286C13.0609 28.7741 12.7139 28.8922 12.3525 28.9685L12.3222 28.9742C11.9536 29.0477 11.5317 29.0894 11.0982 29.0894C11.0665 29.0894 11.0349 29.0894 11.0032 29.0894H11.0075C10.4401 29.0779 9.91887 28.8936 9.48831 28.5883L9.49695 28.5941C8.96271 28.2211 8.53071 27.7373 8.22831 27.1742L8.21823 27.1526C7.93311 26.6688 7.55727 26.2685 7.11231 25.9618L7.09935 25.9531C6.77535 25.7098 6.39375 25.5197 5.98191 25.4059L5.95887 25.4002L5.49807 25.331C5.46495 25.3282 5.42607 25.3267 5.38719 25.3267C5.18559 25.3267 4.99407 25.367 4.81983 25.4376L4.82991 25.4333C4.70703 25.5024 4.66863 25.5907 4.71471 25.6982C4.77087 25.8221 4.83999 25.9286 4.92351 26.0222L4.92207 26.0208C5.00991 26.1245 5.10927 26.2152 5.21727 26.2944L5.22159 26.2973L5.38287 26.4125C5.79039 26.6256 6.12591 26.9222 6.38079 27.2808L6.38655 27.2894C6.66159 27.6307 6.90351 28.0166 7.09791 28.4299L7.11231 28.4645L7.34271 28.9944C7.53711 29.5733 7.88991 30.0571 8.35071 30.407L8.35791 30.4128C8.78991 30.7498 9.31119 30.9917 9.87999 31.1011L9.90303 31.104C10.3782 31.1962 10.9312 31.2538 11.4957 31.2653H11.5057C11.5705 31.2682 11.6454 31.2682 11.7217 31.2682C12.0976 31.2682 12.4662 31.2379 12.8262 31.1789L12.7873 31.1846L13.3173 31.0925C13.3173 31.6771 13.3211 32.3578 13.3288 33.1344C13.3365 33.911 13.3403 34.3301 13.3403 34.3915V34.4117C13.3403 34.6781 13.2251 34.9171 13.0408 35.0827C12.8694 35.2109 12.6534 35.2886 12.4187 35.2886C12.3107 35.2886 12.207 35.2728 12.1105 35.2426L12.1177 35.244C5.01999 32.8118 0.00878906 26.1965 0.00878906 18.4104C0.00878906 15.1445 0.890069 12.0845 2.42943 9.45505L2.38335 9.53857C3.95871 6.84433 6.14031 4.66273 8.75103 3.13201L8.83455 3.08737C11.3387 1.59841 14.3569 0.718567 17.5797 0.718567H17.7208H17.7136V0.720007ZM6.71199 26.159C6.75807 26.0515 6.70431 25.9594 6.55071 25.8826C6.39711 25.8365 6.29727 25.8518 6.25119 25.9286C6.20511 26.0362 6.25887 26.1283 6.41247 26.2051C6.55071 26.2973 6.65055 26.2819 6.71199 26.159ZM7.42767 26.9438C7.53519 26.867 7.51983 26.7442 7.38159 26.5752C7.22799 26.437 7.10511 26.4139 7.01295 26.5061C6.90543 26.5829 6.92079 26.7058 7.05903 26.8747C7.21167 27.0254 7.33455 27.048 7.42767 26.9424V26.9438ZM8.11887 27.9806C8.25711 27.8731 8.25711 27.7272 8.11887 27.5429C7.99599 27.3432 7.86543 27.2971 7.72719 27.4046C7.58895 27.4814 7.58895 27.6197 7.72719 27.8194C7.86543 28.019 7.99599 28.0728 8.11887 27.9806ZM9.08655 28.9498C9.20943 28.8269 9.17871 28.681 8.99439 28.512C8.81007 28.3277 8.65647 28.3046 8.53359 28.4429C8.39535 28.5658 8.42607 28.7117 8.62575 28.8806C8.81007 29.065 8.96367 29.0861 9.08655 28.944V28.9498ZM10.4013 29.5258C10.4473 29.3568 10.3475 29.2339 10.1017 29.1571C9.87135 29.0957 9.72543 29.1494 9.66399 29.3184C9.60255 29.4874 9.70239 29.6026 9.96351 29.664C10.1939 29.7571 10.3398 29.711 10.4013 29.5258ZM11.8542 29.641C11.8542 29.4413 11.7237 29.3568 11.4625 29.3875C11.2168 29.3875 11.0939 29.472 11.0939 29.641C11.0939 29.8406 11.2245 29.9251 11.4856 29.8944C11.7313 29.8954 11.8542 29.8099 11.8542 29.641ZM13.192 29.4106C13.1613 29.2416 13.023 29.1725 12.7773 29.2032C12.5315 29.2493 12.424 29.3645 12.4547 29.5488C12.4854 29.7331 12.6237 29.7946 12.8694 29.7331C13.1152 29.6717 13.2217 29.5642 13.192 29.4106Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_3800_11377">
                <rect width="36" height="36" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div>
                <div style={{ marginTop: '24px' }}></div>
                <Input
                  {...field}
                  placeholder="Email"
                  variant="base"
                  error={errors.email?.message as string}
                />
              </div>
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div>
                <div style={{ marginTop: '24px' }}></div>
                <Input
                  {...field}
                  placeholder="Password"
                  variant="password"
                  error={errors.password?.message as string}
                />
                <Link className={s.link} href={'forgot-password'}>
                  <Typography variant={'body2'}>Forgot Password</Typography>
                </Link>
              </div>
            )}
          />

          <div className={s.buttons}>
            <Button as="button" fullWidth variant="primary">
              Sign In
            </Button>
            <Typography variant="body2" className={s.text}>
              Don’t have an account?
            </Typography>
            <Link className={s.link} href={'signup'}>
              <Button as="button" fullWidth variant="ghost">
                Sign Up
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  )
}
