import { Typography } from '@bitovyevolki/ui-kit-int'

import s from './TotalUsersCount.module.scss'

type TotalUsersCountProps = {
  usersCount: number
}

export const convertNumber = (num: number, length: number = 6): string[] => {
  return num.toString().padStart(length, '0').split('')
}

export const TotalUsersCount = ({ usersCount }: TotalUsersCountProps) => {
  const digits = convertNumber(usersCount)

  return (
    <div className={s.root}>
      <Typography variant={'h2'}>{'Registered users:'}</Typography>
      <div className={s.usersCounter}>
        {digits.map((digit, index) => (
          <div className={s.digit} key={index}>
            <Typography variant={'h2'}>{digit}</Typography>
          </div>
        ))}
      </div>
    </div>
  )
}
